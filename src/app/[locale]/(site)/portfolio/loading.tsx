export default function PortfolioLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero Banner */}
      <div className="bg-navy py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="h-6 w-28 bg-navy-light/50 rounded-full mx-auto" />
          <div className="h-12 w-52 bg-navy-light/50 rounded-xl mx-auto" />
          <div className="h-5 w-72 max-w-full bg-navy-light/40 rounded-lg mx-auto" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="py-8 bg-background">
        <div className="max-w-6xl mx-auto px-6 flex gap-3 justify-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-24 bg-border/30 rounded-full" />
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="pb-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-surface rounded-2xl border border-border/50 overflow-hidden">
                <div className="h-48 bg-border/20" />
                <div className="p-5 space-y-3">
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-accent/10 rounded-full" />
                    <div className="h-5 w-20 bg-accent/10 rounded-full" />
                  </div>
                  <div className="h-6 w-3/4 bg-border/40 rounded-lg" />
                  <div className="h-3 w-full bg-border/30 rounded" />
                  <div className="h-3 w-2/3 bg-border/30 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
