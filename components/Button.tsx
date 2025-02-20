"use client"
import { Link } from '@/i18n/routing'
import clsx from 'clsx'
import Image from 'next/image'
import { useEffect } from 'react'

type ButtonProps = {

  invert?: boolean
  disabled?:boolean
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  invert = false,
 
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  className = clsx(
    className,
    'inline-flex px-6 py-3 text-sm justify-center font-semibold transition glow-effect border-0 rounded-[0.75rem]',
    invert
      ? 'bg-gradient-white text-primary-800 hover:bg-primary-200'
      : ' bg-gradient-accent text-white ',
      disabled && "opacity-80 cursor-not-allowed",
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
      <button disabled={disabled} className={`${className} `} {...props}>
        {!disabled ? inner : <Image src={"/loader.svg"} width={24} height={24} alt='loader'/>} 
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
