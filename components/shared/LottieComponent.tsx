"use client";

import React, { useEffect, useState } from "react";
import LottieAnimation from "lottie-react";

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
}:LottieComponentProps) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    import(`../../public/animations/${animationPath}`)
      .then((animation) => setAnimationData(animation.default))
      .catch((error) => console.log("Failed to load animation: ", error));
  }, [animationPath]);

  if (!animationData) return null;

  return (
    <LottieAnimation
      animationData={animationData}
      autoplay={autoplay}
      loop={loop}
      className={className}
    />
  );
}

export default LottieComponent;
