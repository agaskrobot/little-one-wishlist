import { IconHeart } from "./icons";

export function SiteFooter({ text }: { text: string }) {
  return (
    <footer className="mt-auto border-t border-blush-100/70 py-8 text-center text-sm text-ink-400">
      <p className="flex items-center justify-center gap-1.5">
        {text}
        <IconHeart className="h-3.5 w-3.5 text-blush-400" />
      </p>
    </footer>
  );
}
