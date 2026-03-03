export default function HomeLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero Skeleton */}
      <div className="relative min-h-[90vh] bg-navy flex items-center justify-center px-6">
        <div className="max-w-4xl w-full text-center space-y-6">
          <div className="h-8 w-48 bg-navy-light/50 rounded-full mx-auto" />
          <div className="h-14 w-3/4 bg-navy-light/50 rounded-2xl mx-auto" />
          <div className="h-14 w-1/2 bg-navy-light/50 rounded-2xl mx-auto" />
          <div className="h-5 w-2/3 bg-navy-light/40 rounded-lg mx-auto" />
          <div className="flex gap-4 justify-center mt-8">
            <div className="h-12 w-40 bg-accent/20 rounded-xl" />
            <div className="h-12 w-40 bg-navy-light/50 rounded-xl" />
          </div>
          <div className="flex gap-8 justify-center mt-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-8 w-16 bg-navy-light/50 rounded mx-auto" />
                <div className="h-3 w-12 bg-navy-light/40 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Section Skeleton */}
      <div className="py-16 bg-surface">
        <div className="max-w-6xl mx-auto px-6 flex gap-8 justify-center">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 w-28 bg-border/30 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Services Section Skeleton */}
      <div className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 space-y-3">
            <div className="h-6 w-32 bg-border/40 rounded-full mx-auto" />
            <div className="h-10 w-72 bg-border/40 rounded-xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-surface rounded-2xl border border-border/50" />
            ))}
          </div>
        </div>
      </div>

      {/* How We Work Skeleton */}
      <div className="py-24 bg-navy">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 space-y-3">
            <div className="h-6 w-32 bg-navy-light/50 rounded-full mx-auto" />
            <div className="h-10 w-64 bg-navy-light/50 rounded-xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-navy-light/30 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
