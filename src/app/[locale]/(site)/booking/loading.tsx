export default function BookingLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero Banner */}
      <div className="bg-navy py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="h-6 w-32 bg-navy-light/50 rounded-full mx-auto" />
          <div className="h-12 w-56 bg-navy-light/50 rounded-xl mx-auto" />
          <div className="h-5 w-72 max-w-full bg-navy-light/40 rounded-lg mx-auto" />
        </div>
      </div>

      {/* Booking Form */}
      <div className="py-20 bg-background">
        <div className="max-w-2xl mx-auto px-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 justify-center">
            <div className="h-11 w-36 bg-accent/20 rounded-xl" />
            <div className="h-11 w-36 bg-border/30 rounded-xl" />
          </div>

          {/* Form Card */}
          <div className="bg-surface rounded-2xl border border-border/50 p-8 space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-border/40 rounded" />
                <div className="h-12 w-full bg-border/20 rounded-xl" />
              </div>
            ))}
            <div className="space-y-2">
              <div className="h-4 w-20 bg-border/40 rounded" />
              <div className="h-28 w-full bg-border/20 rounded-xl" />
            </div>
            <div className="h-12 w-full bg-accent/20 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
