"use client"
import { useEffect, useRef, useState } from "react";
import type { LottiePlayer } from "lottie-web";

const LottieComponent = ({path}:{path:string}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        // path to your animation file, place it inside public folder
        path: path,
      });

      return () => animation.destroy();
    }
  }, [lottie,path]);

  return <div className="size-full" ref={ref} />;
};

export default LottieComponent;
