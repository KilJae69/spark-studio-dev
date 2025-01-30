"use client"
import { Link } from '@/i18n/routing'
import clsx from 'clsx'
import { useEffect } from 'react'

type ButtonProps = {
  invert?: boolean
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  invert = false,
  className,
  children,
  ...props
}: ButtonProps) {
  className = clsx(
    className,
    'inline-flex px-6 py-3 text-sm font-semibold transition glow-effect border-0 rounded-[0.75rem]',
    invert
      ? 'bg-white text-primary-800 hover:bg-primary-200'
      : ' bg-gradient-accent text-white ',
  )

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

  const inner = <span className="relative top-px">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={`${className} `} {...props}>
        {inner}
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
    )
  }

  return (
    <Link className={`${className}`} {...props}>
      {inner}
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
    </Link>
  )
}
