"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import {
  m,
  
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

const MotionImage = m.create(Image);

export function GrayscaleTransitionImage(
  props: Pick<
    ImageProps,
    "src" | "quality" | "className" | "sizes" | "priority"
  > & { alt?: string }
) {
  const ref = useRef<React.ElementRef<"div">>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });
  const grayscale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1]);
  const filter = useMotionTemplate`grayscale(${grayscale})`;

  return (
    <div ref={ref} className="group relative object-cover overflow-hidden aspect-[1216/1083] ">
      <MotionImage
        alt=""
        fill
        style={{ filter } }
        {...props}
      />
      <div
        className="pointer-events-none absolute left-0 top-0 w-full opacity-0 transition duration-300 group-hover:opacity-100"
        aria-hidden="true"
      >
        <Image alt="" fill {...props} />
      </div>
    </div>
  );
}
