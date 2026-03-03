export default function ContactLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero Banner */}
      <div className="bg-navy py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="h-6 w-32 bg-navy-light/50 rounded-full mx-auto" />
          <div className="h-12 w-52 bg-navy-light/50 rounded-xl mx-auto" />
          <div className="h-5 w-80 max-w-full bg-navy-light/40 rounded-lg mx-auto" />
        </div>
      </div>

      {/* Contact Content */}
      <div className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-5 w-28 bg-border/40 rounded" />
                    <div className="h-4 w-48 bg-border/30 rounded" />
                  </div>
                </div>
              ))}
              {/* Map placeholder */}
              <div className="h-48 bg-border/20 rounded-2xl mt-6" />
            </div>

            {/* Form */}
            <div className="bg-surface rounded-2xl border border-border/50 p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-20 bg-border/40 rounded" />
                    <div className="h-12 w-full bg-border/20 rounded-xl" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-border/40 rounded" />
                <div className="h-12 w-full bg-border/20 rounded-xl" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-border/40 rounded" />
                <div className="h-28 w-full bg-border/20 rounded-xl" />
              </div>
              <div className="h-12 w-full bg-accent/20 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
