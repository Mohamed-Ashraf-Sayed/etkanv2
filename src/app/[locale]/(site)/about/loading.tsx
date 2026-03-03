export default function AboutLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero Banner */}
      <div className="bg-navy py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="h-6 w-28 bg-navy-light/50 rounded-full mx-auto" />
          <div className="h-12 w-56 bg-navy-light/50 rounded-xl mx-auto" />
          <div className="h-5 w-80 max-w-full bg-navy-light/40 rounded-lg mx-auto" />
        </div>
      </div>

      {/* About Content */}
      <div className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="h-8 w-48 bg-border/40 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-border/30 rounded" />
                <div className="h-4 w-5/6 bg-border/30 rounded" />
                <div className="h-4 w-4/6 bg-border/30 rounded" />
                <div className="h-4 w-full bg-border/30 rounded" />
                <div className="h-4 w-3/4 bg-border/30 rounded" />
              </div>
            </div>
            <div className="h-80 bg-surface rounded-2xl border border-border/50" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-16 bg-surface">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="h-10 w-20 bg-border/40 rounded-lg mx-auto" />
              <div className="h-4 w-24 bg-border/30 rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 space-y-3">
            <div className="h-8 w-40 bg-border/40 rounded-xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-surface rounded-2xl border border-border/50 p-6 text-center space-y-3">
                <div className="w-24 h-24 bg-border/30 rounded-full mx-auto" />
                <div className="h-5 w-32 bg-border/40 rounded mx-auto" />
                <div className="h-4 w-24 bg-border/30 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
