export default function ServicesLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero Banner */}
      <div className="bg-navy py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="h-6 w-36 bg-navy-light/50 rounded-full mx-auto" />
          <div className="h-12 w-64 bg-navy-light/50 rounded-xl mx-auto" />
          <div className="h-5 w-96 max-w-full bg-navy-light/40 rounded-lg mx-auto" />
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-surface rounded-2xl border border-border/50 p-6 space-y-4">
                <div className="w-14 h-14 bg-accent/10 rounded-xl" />
                <div className="h-6 w-3/4 bg-border/40 rounded-lg" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-border/30 rounded" />
                  <div className="h-3 w-5/6 bg-border/30 rounded" />
                  <div className="h-3 w-2/3 bg-border/30 rounded" />
                </div>
                <div className="h-10 w-32 bg-accent/10 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
