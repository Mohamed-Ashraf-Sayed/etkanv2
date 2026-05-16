import React from "react";
import InitialsAvatar from "@/components/shared/InitialsAvatar";

export type Testimonial = {
  text: string;
  image?: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const duration = props.duration || 10;

  return (
    <div className={props.className}>
      <div
        className="flex flex-col gap-6 pb-6 animate-marquee-y motion-reduce:animate-none"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => (
                <div
                  className="p-10 rounded-3xl border border-white/[0.08] shadow-lg shadow-accent/10 max-w-xs w-full bg-white/[0.07] backdrop-blur-sm"
                  key={i}
                >
                  <div className="text-white/90 font-cairo leading-relaxed text-[15px]">
                    &ldquo;{text}&rdquo;
                  </div>
                  <div className="flex items-center gap-3 mt-5">
                    <InitialsAvatar
                      name={name}
                      className="h-10 w-10 border-accent/30"
                      textClassName="text-sm"
                    />
                    <div className="flex flex-col">
                      <div className="font-cairo font-bold tracking-tight leading-5 text-white">
                        {name}
                      </div>
                      <div className="leading-5 text-white/50 tracking-tight text-sm">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </div>
    </div>
  );
};
