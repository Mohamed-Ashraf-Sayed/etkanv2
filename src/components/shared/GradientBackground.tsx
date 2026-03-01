export default function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Single subtle static glow */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-50 dark:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
