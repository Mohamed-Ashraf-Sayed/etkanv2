"use client";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Badge from "@/components/ui/Badge";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  summary: string;
  url: string;
  image: string;
  tags?: string[];
}

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <Link href={item.url as any} className="group block h-[220px] md:h-[260px]">
      <div className="overflow-hidden rounded-xl h-full w-full border border-border bg-surface relative transition-all duration-500 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
        <div className="relative h-full w-full transition-all duration-500 group-hover:h-[40%]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="320px"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-2 transition-all duration-500 flex flex-col justify-center bg-surface opacity-0 group-hover:opacity-100 group-hover:h-[60%] h-0 overflow-hidden">
          <span className="text-accent text-[11px] font-cairo font-semibold">
            {item.subtitle}
          </span>
          <h3 className="text-sm font-bold font-cairo text-text-primary mb-1 leading-tight mt-0.5">
            {item.title}
          </h3>
          <p className="text-text-muted text-xs font-cairo line-clamp-2 leading-relaxed">
            {item.summary}
          </p>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {item.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-accent/10 text-accent/80 text-[9px] px-1.5 py-0.5 rounded border border-accent/15 font-cairo"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent transition-opacity duration-500 group-hover:opacity-0">
          {item.badge && (
            <div className="mb-1">
              <Badge variant="gold">{item.badge}</Badge>
            </div>
          )}
          <h3 className="text-xs font-bold font-cairo text-white leading-tight">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

function CarouselRow({
  items,
  direction,
  apiRef,
}: {
  items: GalleryItem[];
  direction: "rtl" | "ltr";
  apiRef: (api: CarouselApi) => void;
}) {
  return (
    <Carousel
      setApi={apiRef}
      opts={{
        align: "start",
        direction,
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-3">
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className="pl-3 basis-[80%] sm:basis-[45%] md:basis-1/3"
          >
            <GalleryCard item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default function GalleryHoverCarousel({
  items,
}: {
  items: GalleryItem[];
}) {
  const mid = Math.ceil(items.length / 2);
  const row1 = items.slice(0, mid);
  const row2 = items.slice(mid);

  const [api1, setApi1] = useState<CarouselApi>();
  const [api2, setApi2] = useState<CarouselApi>();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!api1 || !api2) return;
    const update = () => {
      setCanPrev(api1.canScrollPrev() || api2.canScrollPrev());
      setCanNext(api1.canScrollNext() || api2.canScrollNext());
    };
    update();
    api1.on("select", update);
    api2.on("select", update);
    return () => {
      api1.off("select", update);
      api2.off("select", update);
    };
  }, [api1, api2]);

  // Row 2 starts from end, so scrolling is opposite
  useEffect(() => {
    if (!api2) return;
    // Scroll row 2 to the end on mount
    const timer = setTimeout(() => {
      api2.scrollTo(api2.scrollSnapList().length - 1, true);
    }, 100);
    return () => clearTimeout(timer);
  }, [api2]);

  const scrollPrev = () => {
    api1?.scrollPrev();
    api2?.scrollNext();
  };

  const scrollNext = () => {
    api1?.scrollNext();
    api2?.scrollPrev();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Navigation buttons */}
      <div className="flex items-center justify-end gap-3 mb-8">
        <button
          onClick={scrollPrev}
          disabled={!canPrev}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
            canPrev
              ? "bg-accent text-navy shadow-[0_4px_16px_rgba(212,175,55,0.3)] hover:bg-accent-light hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] cursor-pointer active:scale-95"
              : "bg-surface-light text-text-muted/30 cursor-not-allowed"
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canNext}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
            canNext
              ? "bg-accent text-navy shadow-[0_4px_16px_rgba(212,175,55,0.3)] hover:bg-accent-light hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] cursor-pointer active:scale-95"
              : "bg-surface-light text-text-muted/30 cursor-not-allowed"
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Two rows */}
      <div className="space-y-3">
        <CarouselRow items={row1} direction="rtl" apiRef={setApi1} />
        <CarouselRow items={[...row2].reverse()} direction="rtl" apiRef={setApi2} />
      </div>
    </div>
  );
}
