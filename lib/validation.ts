const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim()) && email.trim().length <= 254;
}

export function isValidName(
  value: string,
  min = 2,
  max = 60
): boolean {
  const trimmed = value.trim();
  return trimmed.length >= min && trimmed.length <= max;
}

export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export const LIMITS = {
  babyName: { min: 2, max: 60 },
  parentName: { min: 1, max: 60 },
  itemTitle: { min: 2, max: 120 },
  note: { max: 300 },
  price: { max: 40 },
};
