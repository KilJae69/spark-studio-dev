"use client";

import React  from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type LottieComponentProps = {
  animationPath: string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
};

function LottieComponent({
  animationPath,
  autoplay = true,
  loop = true,
  className = "",
}: LottieComponentProps) {
  const animationSrc = animationPath;

  return (
    <DotLottieReact
      src={animationSrc}
      autoplay={autoplay}
      loop={loop}
      className={className}
    />
  );
}

export default LottieComponent;
