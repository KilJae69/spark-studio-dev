"use client";

import { useState, useCallback } from "react";
import Link, { LinkProps } from "next/link";
import { ArrowRight } from "lucide-react";

interface SlideArrowLinkProps extends Omit<LinkProps, "ref"> {
  href: string;
  text?: string;
  primaryColor?: string;
  className?: string;
}

export default function SlideArrowLink({
  href,
  text = "Get Started",
  primaryColor = "#d4af37",
  className = "",
  ...props
}: SlideArrowLinkProps) {
  const [isActive, setIsActive] = useState(false);

  const handlePointerEnter = useCallback((event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === 'mouse') setIsActive(true);
  }, []);
  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.isPrimary) setIsActive(true);
  }, []);
  const handlePointerLeave = useCallback(() => {
    setIsActive(false);
  }, []);
  const handlePointerUp = useCallback(() => {
    setIsActive(false);
  }, []);

  return (
    <Link
      href={href}
      {...props}
      onPointerEnter={handlePointerEnter}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
      className={`group relative rounded-full border border-transparent cursor-pointer bg-transparent p-3  font-semibold ${className}`}
    >
      <div
        className="absolute aspect-square left-0 top-0 flex h-full items-center justify-end rounded-full transition-all duration-200 ease-in-out"
        style={{
          width: isActive ? '100%' : '54px',
          backgroundColor: primaryColor
        }}
      >
        <span className="mr-4 text-white transition-all duration-200 ease-in-out">
          <ArrowRight size={20} />
        </span>
      </div>
      <span
        className="relative z-10 whitespace-nowrap px-8  font-semibold transition-all duration-200 ease-in-out"
        style={{
          color: isActive ? 'white' : 'black',
          left: isActive ? '-12px' : '16px'
        }}
      >
        {text}
      </span>
    </Link>
  );
}
