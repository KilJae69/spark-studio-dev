"use client"
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver({ 
  threshold = 0.1, 
  rootMargin = '50px' 
}: UseIntersectionObserverProps = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !isLoaded) {
      setIsLoaded(true);
    }
  }, [inView, isLoaded]);

  return { ref, isLoaded };
}