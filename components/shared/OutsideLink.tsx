import { ReactNode } from "react";

export default function OutsideLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className="bg-gradient-accent mx-auto tracking-wider sm:text-lg text-white inline-flex px-6 py-3 text-sm justify-center font-semibold transition glow-effect border-0 rounded-[0.75rem]"
      target="__blank"
      rel="noreferer noopener"
      href={href}
    >
      {children}
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
    </a>
  );
}
