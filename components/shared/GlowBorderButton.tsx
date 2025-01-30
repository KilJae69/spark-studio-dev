"use client";
import { ReactNode, useEffect } from "react";

export default function GlowBorderButton({children}:{children:ReactNode}) {
  useEffect(() => {
    const setGlowEffectRx = () => {
      const glowEffects = document.querySelectorAll(".glow-effect");
      glowEffects.forEach((glowEffect) => {
        const glowLines = glowEffect.querySelectorAll("rect");
        const rx = getComputedStyle(glowEffect).borderRadius;
        glowLines.forEach((line) => {
          line.setAttribute("rx", rx);
        });
      });
    };

    setGlowEffectRx(); // Run once when mounted
  }, []);

  return (
    <button className="button glow-effect">
      {children}
      <svg className="glow-container">
        <rect
          pathLength="100"
          strokeLinecap="round"
          className="glow-blur"
        ></rect>
        <rect
          pathLength="100"
          strokeLinecap="round"
          className="glow-line"
        ></rect>
      </svg>
    </button>
  );
}
