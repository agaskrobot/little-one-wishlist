import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const variants: Record<Variant, string> = {
  primary:
    "bg-blush-400 text-white shadow-softer hover:bg-blush-500 active:bg-blush-600",
  secondary:
    "bg-white text-ink-700 ring-1 ring-blush-200 hover:bg-blush-50",
  ghost: "text-ink-500 hover:bg-blush-50 hover:text-ink-700",
  danger: "bg-white text-red-500 ring-1 ring-red-200 hover:bg-red-50",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
};

export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className = ""
): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={buttonClasses(variant, size, className)}
      {...props}
    />
  );
}
