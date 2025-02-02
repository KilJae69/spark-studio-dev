"use client";

import { useState, useEffect, useCallback, useRef } from "react";

function useScrollPosition(debounceDuration = 100): [number, boolean] {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback((func: () => void, wait: number) => {
    if (debounceTimeout.current !== null) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(func, wait);
  }, []);

  const handleScroll = useCallback(() => {
    debounce(() => {
      const currentScrollPosition = window.pageYOffset;
      setScrollPosition(currentScrollPosition);
      if (loading) setLoading(false);
    }, debounceDuration);
  }, [debounce, debounceDuration, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (debounceTimeout.current !== null) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [handleScroll]);

  return [scrollPosition, loading];
}

export default useScrollPosition;