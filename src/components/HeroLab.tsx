"use client";

import { useState } from "react";
import { DialRoot, useDialKit } from "dialkit";

/**
 * Throwaway tuning page for the hero's load animation. It renders the real
 * <Hero> and only overrides the CSS variables that animation already reads, so
 * what plays here is exactly what the site does: porting a setting means
 * copying the number into :root in globals.css. Delete once the timings settle.
 */
export function HeroLab({ children }: { children: React.ReactNode }) {
  // Remounting restarts every animation, which is all a replay needs to be.
  const [run, setRun] = useState(0);

  const d = useDialKit(
    "Hero",
    {
      cracks: {
        drawMs: [2900, 100, 4000, 50],
        staggerMs: [50, 0, 600, 10],
      },
      plants: {
        gapAfterCracksMs: [1100, -1500, 1500, 50],
        popMs: [520, 100, 2000, 20],
        staggerMs: [120, 0, 600, 10],
      },
    },
    // A stable id keeps the panel across remounts — replay remounts the hero —
    // and persist keeps whatever you dialled in through a reload.
    { id: "hero", persist: true },
  );

  const cracksDone = d.cracks.drawMs + 6 * d.cracks.staggerMs + d.plants.gapAfterCracksMs;
  const total = cracksDone + 3 * d.plants.staggerMs + d.plants.popMs;

  return (
    <div className="bg-page min-h-screen">
      <DialRoot position="top-right" defaultOpen />

      <div className="flex items-center gap-4 px-8 pt-6">
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="border-rule rounded-full border bg-white px-4 py-2 text-[13px] font-bold italic"
        >
          Replay
        </button>
        <span className="text-[13px] italic opacity-70">
          7 crack branches · 3 scribbles · total ≈ {Math.round(total)}ms
        </span>
      </div>

      <div
        key={run}
        className="my-6"
        style={
          {
            "--hero-draw": `${d.cracks.drawMs}ms`,
            "--hero-crack-stagger": `${d.cracks.staggerMs}ms`,
            "--hero-gap": `${d.plants.gapAfterCracksMs}ms`,
            "--hero-pop": `${d.plants.popMs}ms`,
            "--hero-plant-stagger": `${d.plants.staggerMs}ms`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
