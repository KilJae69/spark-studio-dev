"use client";
import { Link } from "@/i18n/routing";
import { useMotionValue, m } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useModal } from "../ui/animated-modal";

type LinkProps = {
  heading: string;
  iconSrc?: string;
  iconAlt?: string;
  href: string;
};

export default function CustomLink({
  heading,
  href,
  iconSrc,
  iconAlt,
}: LinkProps) {
  const { setOpen } = useModal();
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const rect = ref.current!.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <Link onClick={() => setOpen(false)} href={href}>
      <m.span
        ref={ref}
        onMouseMove={handleMouseMove}
        initial="initial"
        whileHover="whileHover"
        className="group relative flex items-center justify-between border-b-2 border-primary-700 transition-colors duration-500 "
      >
        <m.span
          variants={{
            initial: { width: 0 },
            whileHover: { width: "100%" },
          }}
        //  transition={{ type: "spring" }}
          className="rounded-[10px] absolute inset-x-0  bg-primary-accent w-0 group-hover:w-full transition-all duration-500 -bottom-[2px] h-[3px]"
        />
        <div>
          <m.span
            variants={{
              initial: { x: 0 },
              whileHover: { x: -16 },
            }}
            transition={{
              type: "spring",
              staggerChildren: 0.075,
              delayChildren: 0.25,
            }}
            className="relative z-10  text-xl flex items-center justify-center font-bold text-primary-800 transition-colors duration-500 group-hover:text-primary-accent "
          >
            <m.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={iconSrc}
            >
              <Image
                src={iconSrc || ""}
                alt={iconAlt || ""}
                width={40}
                height={20}
                className="mr-2"
                unoptimized
              />
            </m.span>
            {heading.split("").map((l, i) => (
              <m.span
                variants={{
                  initial: { x: 0 },
                  whileHover: { x: 16 },
                }}
                transition={{ type: "spring" }}
                className="inline-block"
                key={i}
              >
                {l}
              </m.span>
            ))}
          </m.span>
        </div>

        <m.div
          variants={{
            initial: {
              x: "25%",
              opacity: 0,
            },
            whileHover: {
              x: "0%",
              opacity: 1,
            },
          }}
          transition={{ type: "spring" }}
          className="relative z-10 p-4"
        >
          <FiArrowRight className="text-5xl text-primary-accent" />
        </m.div>
      </m.span>
    </Link>
  );
}
