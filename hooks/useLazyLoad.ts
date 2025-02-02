import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function useLazyLoad(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsInView(true);
    }
  }, [inView]);

  return { ref, isInView };
}