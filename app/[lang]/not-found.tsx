import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { NotFoundCard } from "@/components/not-found-card";

export default async function NotFound() {
  const dict = await getDictionary(defaultLocale);
  return <NotFoundCard dict={dict} locale={defaultLocale} />;
}
