# Little One — wishlist dla noworodka

Aplikacja do tworzenia listy życzeń dla dziecka: rodzic zostawia e-mail i imię
dziecka i od razu dostaje unikalny link edycyjny na ekranie, dodaje do niego
prezenty (linki do produktów) i udostępnia znajomym link/kod QR do
rezerwowania prezentów bez podwójnych zakupów. Dostępna po polsku, angielsku
i hiszpańsku.

## Jak to jest zbudowane

- **Next.js 16 (App Router)** — routing zlokalizowany pod `app/[lang]/...`
  (`pl` / `en` / `es`), wykrywanie języka i przekierowania w `proxy.ts`.
- **Dane** — `lib/wishlist.ts` (warstwa dostępu do danych) nad prostym
  key-value store (`lib/db`). W produkcji używa Upstash Redis / Vercel KV;
  bez skonfigurowanych zmiennych środowiskowych automatycznie przełącza się
  na magazyn w pamięci (wygodne do lokalnego developmentu, **nietrwałe**).
  Listy wygasają po 6 miesiącach dzięki natywnemu TTL Redisa — nie ma
  potrzeby żadnego cron joba do sprzątania.
- **E-mail nie jest wysyłany** — po podaniu adresu e-mail i imienia dziecka
  unikalny link edycyjny pokazuje się od razu na ekranie (z przyciskiem
  kopiowania). Adres e-mail służy wyłącznie do wymuszenia reguły „jedna
  aktywna lista na e-mail" — jeśli lista już istnieje, aplikacja pokazuje
  link do niej zamiast tworzyć nową.
- **Mutacje** — Server Actions w `lib/actions.ts` (dodawanie/usuwanie
  przedmiotów, rezerwacje, tworzenie listy).
- **QR kod** — generowany po stronie serwera pakietem `qrcode` na stronie
  panelu edycyjnego.

## Rozwój lokalny

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) — przekieruje do
`/pl` (lub innego języka wykrytego z `Accept-Language`).

Skopiuj `.env.example` do `.env.local`, jeśli chcesz podłączyć trwałe
przechowywanie danych (Upstash Redis). Bez tego appka działa w pełni
lokalnie z magazynem w pamięci.

## Deploy na Vercel

1. Podłącz repo do Vercel.
2. Dodaj zmienne środowiskowe z `.env.example`:
   - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` — trwałe dane
     (np. przez integrację Vercel Marketplace → Upstash, albo własną bazę
     Upstash Redis).
3. Deploy — bez kroku 2 appka wystartuje, ale dane znikną przy każdym
   restarcie instancji serverless, więc jest to wymagane przed realnym
   użyciem.
