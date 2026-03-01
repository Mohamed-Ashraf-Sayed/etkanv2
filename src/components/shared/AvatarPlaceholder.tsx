interface AvatarPlaceholderProps {
  gender: "male" | "female";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-14 h-14",
  md: "w-20 h-20",
  lg: "w-28 h-28",
};

export default function AvatarPlaceholder({
  gender,
  size = "md",
  className = "",
}: AvatarPlaceholderProps) {
  return (
    <div
      className={`${sizeMap[size]} rounded-full bg-navy/10 border-2 border-accent/30 flex items-center justify-center overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background */}
        <rect width="64" height="64" fill="transparent" />

        {gender === "male" ? (
          <>
            {/* Male head */}
            <circle cx="32" cy="22" r="10" fill="rgba(212, 175, 55, 0.35)" />
            {/* Male shoulders */}
            <path
              d="M12 58 C12 44 22 38 32 38 C42 38 52 44 52 58"
              fill="rgba(212, 175, 55, 0.25)"
            />
          </>
        ) : (
          <>
            {/* Female head */}
            <circle cx="32" cy="22" r="10" fill="rgba(212, 175, 55, 0.35)" />
            {/* Female hair detail */}
            <path
              d="M22 20 C22 12 26 10 32 10 C38 10 42 12 42 20 C42 16 40 14 38 14 C36 16 28 16 26 14 C24 14 22 16 22 20Z"
              fill="rgba(212, 175, 55, 0.2)"
            />
            {/* Female shoulders (slightly narrower) */}
            <path
              d="M14 58 C14 44 23 38 32 38 C41 38 50 44 50 58"
              fill="rgba(212, 175, 55, 0.25)"
            />
          </>
        )}
      </svg>
    </div>
  );
}
