export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

export const headingGradient =
  'bg-linear-to-r from-primary via-accent to-[#855cd6] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-pan'