"use client";
import { useEffect, useRef, useState } from "react";
import type { LottiePlayer } from "lottie-web";
// Install with: npm i lodash.throttle

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastCall = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
};

const LottieComponent = ({ path }: { path: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));

    // Throttled Resize Handler
    const handleResize = throttle(() => {
      setIsMobile(window.innerWidth < 768);
    }, 300); // Runs at most once every 300ms

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: !isMobile, // Disable loop on mobile
        autoplay: !isMobile, // Disable autoplay on mobile
        path: path,
      });

      return () => animation.destroy();
    }
  }, [lottie, path, isMobile]);

  return <div className="size-full" ref={ref} />;
};

export default LottieComponent;
