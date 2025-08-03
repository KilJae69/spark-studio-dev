"use client";
import React from "react";
import { motion } from "motion/react";

export function ColourfulText({ text }: { text: string }) {
  const colors = Array(8).fill("#d4af37"); // your gold color
  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((c) => c + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{ whiteSpace: "normal" }}>
      {/*
        Split on spaces, but include them in the array so we can
        render them as normal text nodes between word-spans.
      */}
      {text.split(/(\s+)/).map((chunk, chunkIdx) => {
        if (/\s+/.test(chunk)) {
          // it's just whitespace: render as-is
          return chunk;
        }
        // it's a word: wrap in a non-breaking inline-block
        return (
          <span
            key={`word-${chunkIdx}-${count}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {chunk.split("").map((char, charIdx) => (
              <motion.span
                key={`${char}-${chunkIdx}-${charIdx}-${count}`}
                initial={{ y: 0 }}
                animate={{
                  color: currentColors[
                    (chunkIdx + charIdx) % currentColors.length
                  ],
                  y: [0, -3, 0],
                  scale: [1, 1.01, 1],
                  filter: ["blur(0px)", "blur(3px)", "blur(0px)"],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 0.5,
                  delay: charIdx * 0.03,
                }}
                className="inline-block font-sans tracking-tight"
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
