type MarqueeBannerProps = {
  text: string;
  variant?: "hero" | "default";
};

export default function MarqueeBanner({
  text,
  variant = "default",
}: MarqueeBannerProps) {
  return (
    <div
      className={`overflow-hidden whitespace-nowrap    
    ${
      variant === "hero"
        ? "bg-primary py-5 md:py-10"
        : "bg-lightBg py-10 md:py-20"
    }
    `}
    >
      <span
        className={`inline-block animate-marquee select-none   font-thin text-[#d3dce0] 
        ${
          variant === "hero"
            ? "pl-10 text-3xl md:text-7xl"
            : "pl-20 text-7xl md:text-[200px]"
        }
        `}
      >
        {text}
      </span>
      <span
        className={`inline-block animate-marquee select-none pl-20  font-thin text-[#d3dce0] 
        ${
          variant === "hero"
            ? "text-3xl md:text-7xl"
            : "text-7xl md:text-[200px]"
        }
        `}
      >
        {text}
      </span>
    </div>
  );
}
