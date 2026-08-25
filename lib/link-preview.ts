import "server-only";

const FETCH_TIMEOUT_MS = 8000;
const MAX_BYTES = 700_000;
const MAX_TEXT_LENGTH = 200;

export interface LinkPreview {
  title: string | null;
  image: string | null;
  price: string | null;
}

const PRIVATE_HOSTNAME_PATTERNS = [
  /^localhost$/i,
  /\.local$/i,
  /^127\./,
  /^0\.0\.0\.0$/,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^\[?::1\]?$/,
];

function isPrivateHostname(hostname: string): boolean {
  return PRIVATE_HOSTNAME_PATTERNS.some((re) => re.test(hostname));
}

function assertFetchable(url: URL): void {
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("unsupported protocol");
  }
  if (isPrivateHostname(url.hostname)) {
    throw new Error("blocked host");
  }
}

async function readLimited(res: Response, maxBytes: number): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return res.text();

  const decoder = new TextDecoder();
  let received = 0;
  let result = "";
  while (received < maxBytes) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    result += decoder.decode(value, { stream: true });
  }
  await reader.cancel().catch(() => {});
  return result;
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function clean(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = decodeHtmlEntities(value).replace(/\s+/g, " ").trim();
  if (!trimmed) return null;
  return trimmed.slice(0, MAX_TEXT_LENGTH);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractMeta(html: string, key: string): string | null {
  const escaped = escapeRegExp(key);
  const contentAfter = new RegExp(
    `<meta[^>]+(?:property|name|itemprop)=["']${escaped}["'][^>]*content=["']([^"']*)["']`,
    "i"
  );
  const contentBefore = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name|itemprop)=["']${escaped}["']`,
    "i"
  );
  return html.match(contentAfter)?.[1] ?? html.match(contentBefore)?.[1] ?? null;
}

function resolveUrl(maybeRelative: string, base: string): string | null {
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return null;
  }
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  PLN: "zł",
};

function formatPrice(amount: string, currency?: string | null): string | null {
  const trimmedAmount = amount.trim();
  if (!trimmedAmount) return null;
  if (!currency) return trimmedAmount;
  const symbol = CURRENCY_SYMBOLS[currency.toUpperCase()];
  if (!symbol) return `${trimmedAmount} ${currency.toUpperCase()}`;
  return symbol === "zł" ? `${trimmedAmount} ${symbol}` : `${symbol}${trimmedAmount}`;
}

function findOfferPrice(
  node: unknown,
  depth = 0
): { price: string; currency: string | null } | null {
  if (!node || typeof node !== "object" || depth > 4) return null;
  const obj = node as Record<string, unknown>;

  if (Array.isArray(obj["@graph"])) {
    for (const entry of obj["@graph"] as unknown[]) {
      const found = findOfferPrice(entry, depth + 1);
      if (found) return found;
    }
  }

  const offers = obj.offers;
  if (offers) {
    const offerList = Array.isArray(offers) ? offers : [offers];
    for (const offer of offerList) {
      if (offer && typeof offer === "object") {
        const price = (offer as Record<string, unknown>).price;
        const currency = (offer as Record<string, unknown>).priceCurrency;
        if (price !== undefined && price !== null && String(price).trim()) {
          return {
            price: String(price),
            currency: typeof currency === "string" ? currency : null,
          };
        }
      }
    }
  }

  return null;
}

function extractJsonLdPrice(html: string): { price: string; currency: string | null } | null {
  const scripts = html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  );
  for (const match of scripts) {
    try {
      const json = JSON.parse(match[1].trim());
      const candidates = Array.isArray(json) ? json : [json];
      for (const node of candidates) {
        const found = findOfferPrice(node);
        if (found) return found;
      }
    } catch {
      continue;
    }
  }
  return null;
}

function extractAmazonImage(html: string): string | null {
  const oldHires = html.match(/data-old-hires="([^"]+)"/);
  if (oldHires?.[1]) return oldHires[1];

  const hiRes = html.match(/"hiRes":"([^"]+)"/);
  if (hiRes?.[1]) return hiRes[1];

  return null;
}

function extractPrice(html: string): string | null {
  const jsonLd = extractJsonLdPrice(html);
  if (jsonLd) return formatPrice(jsonLd.price, jsonLd.currency);

  const amount = extractMeta(html, "og:price:amount") ?? extractMeta(html, "product:price:amount");
  if (amount) {
    const currency =
      extractMeta(html, "og:price:currency") ?? extractMeta(html, "product:price:currency");
    return formatPrice(amount, currency);
  }

  const itemPropPrice = extractMeta(html, "price");
  if (itemPropPrice) {
    return formatPrice(itemPropPrice, extractMeta(html, "priceCurrency"));
  }

  return null;
}

export async function fetchLinkPreview(rawUrl: string): Promise<LinkPreview> {
  const url = new URL(rawUrl);
  assertFetchable(url);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; LittleOneWishlistBot/1.0; +link-preview)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    throw new Error(`upstream responded with ${res.status}`);
  }

  assertFetchable(new URL(res.url || rawUrl));

  const html = await readLimited(res, MAX_BYTES);
  const finalUrl = res.url || rawUrl;

  const title = clean(
    extractMeta(html, "og:title") ??
      extractMeta(html, "twitter:title") ??
      html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
  );

  const rawImage =
    extractMeta(html, "og:image") ??
    extractMeta(html, "og:image:url") ??
    extractMeta(html, "twitter:image") ??
    extractAmazonImage(html);
  const image = rawImage ? resolveUrl(rawImage, finalUrl) : null;

  const price = extractPrice(html);

  return { title, image, price };
}
