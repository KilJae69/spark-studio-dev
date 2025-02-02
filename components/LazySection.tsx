
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Suspense } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export function LazySection({ 
  children, 
  fallback = <div className="min-h-[200px]" />,
  threshold,
  rootMargin
}: LazySectionProps) {
  const { ref, isLoaded } = useIntersectionObserver({ threshold, rootMargin });

  return (
    <div ref={ref}>
      {isLoaded ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : fallback}
    </div>
  );
}