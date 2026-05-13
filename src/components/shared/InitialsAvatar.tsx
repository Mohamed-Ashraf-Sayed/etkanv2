interface InitialsAvatarProps {
  name: string;
  className?: string;
  textClassName?: string;
}

const GRADIENT_PALETTES = [
  "from-accent/30 to-accent/10 text-accent",
  "from-emerald-500/30 to-emerald-500/10 text-emerald-500",
  "from-sky-500/30 to-sky-500/10 text-sky-500",
  "from-violet-500/30 to-violet-500/10 text-violet-500",
  "from-rose-500/30 to-rose-500/10 text-rose-500",
  "from-amber-500/30 to-amber-500/10 text-amber-500",
];

function pickPalette(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return GRADIENT_PALETTES[hash % GRADIENT_PALETTES.length];
}

function getInitials(name: string): string {
  const cleaned = name.replace(/^(م\.|أ\.|د\.|Eng\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function InitialsAvatar({
  name,
  className = "h-10 w-10",
  textClassName = "text-sm",
}: InitialsAvatarProps) {
  const initials = getInitials(name);
  const palette = pickPalette(name);

  return (
    <div
      className={`shrink-0 rounded-full bg-gradient-to-br ${palette} border border-current/20 flex items-center justify-center font-cairo font-bold ${className}`}
      aria-label={name}
    >
      <span className={textClassName}>{initials}</span>
    </div>
  );
}
