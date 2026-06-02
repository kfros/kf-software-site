import React from "react";

export function HeroPhones() {
  return (
    <div className="relative mx-auto flex h-[380px] w-full max-w-[450px] items-center justify-center sm:h-[480px] md:h-[500px] lg:h-[460px] xl:h-[520px]">
      {/* Background Slate-Blue Glow - Soft and Neutral */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] sm:h-[450px] sm:w-[450px] sm:blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(148, 163, 184, 0.22) 0%, rgba(30, 46, 72, 0.14) 50%, rgba(15, 23, 42, 0.10) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Ground Shadow - Softer and More Realistic */}
      <div
        className="pointer-events-none absolute bottom-2 left-1/2 z-0 h-4 w-[220px] -translate-x-1/2 rounded-full bg-slate-950/12 blur-md sm:bottom-1 sm:w-[280px] sm:blur-lg"
        aria-hidden="true"
      />

      {/* Back Phone Composition - Clearly Visible & Polished Layer */}
      <div className="hidden sm:block absolute left-1/2 top-1/2 z-10 -translate-y-1/2 -translate-x-[120px] sm:-translate-x-[125px] md:-translate-x-[135px] lg:-translate-x-[125px] xl:-translate-x-[140px] rotate-[-8deg] scale-[0.90] opacity-[0.94] transition-all duration-300">
        <div className="relative rounded-[36px] bg-slate-950 p-[5px] sm:p-[6px] ring-1 ring-white/10 shadow-[0_12px_35px_rgba(15,23,42,0.16)] border border-slate-800/80 w-[200px] sm:w-[230px] md:w-[240px] lg:w-[220px] xl:w-[240px]">
          {/* Inner Screen Container */}
          <div className="relative aspect-[564/1280] w-full overflow-hidden rounded-[30px] bg-[#FAF9F6]">
            <img
              src="/screens/chillpup-session.jpg"
              alt="ChillPup session screen showing a guided calming step"
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Brand-Neutral Simplified Notch / Bezel Element */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-slate-950 rounded-full z-30 opacity-90" />
          </div>
        </div>
      </div>

      {/* Front Phone Composition - Elegant Slim Focus */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-y-1/2 -translate-x-1/2 sm:-translate-x-[15px] md:translate-x-[0px] lg:-translate-x-[10px] xl:translate-x-[5px] rotate-[6deg] scale-100 transition-all duration-300">
        <div className="relative rounded-[36px] bg-slate-950 p-[5px] sm:p-[6px] ring-1 ring-white/10 shadow-[0_20px_45px_rgba(15,23,42,0.22)] border border-slate-800/80 w-[200px] sm:w-[230px] md:w-[240px] lg:w-[220px] xl:w-[240px]">
          {/* Inner Screen Container */}
          <div className="relative aspect-[591/1280] w-full overflow-hidden rounded-[30px] bg-[#FAF9F6]">
            <img
              src="/screens/chillpup-home.jpg"
              alt="ChillPup home screen showing current signs, recent progress, and a recommended calming routine"
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Brand-Neutral Simplified Notch / Bezel Element */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-slate-950 rounded-full z-30 opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
}
