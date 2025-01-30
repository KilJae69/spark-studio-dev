/*
#tailwind.config.ts 
"transparent-red-border": "rgba(250, 52, 52, 0.1)",
"transparent-gray-border": "rgba(255, 255, 255, 0.1)",
bgRoseGlow: "0 0 5px #ff0461,0 0 15px #ff0461,0 0 30px #ff0461,0 0 60px #ff0461"
*/

import { ReactNode } from "react";

export default function GlassmorphButtonTW({children}:{children:ReactNode}) {
  return (
    <div className=" group relative z-10 h-[50px] w-[250px]">
      <a
        href="#"
        className="group absolute left-0 top-0 z-20 flex size-full items-center justify-center overflow-hidden rounded-full border-y border-b-transparent-gray-border border-t-transparent-red-border bg-white/10 tracking-[1px] text-primary-800 shadow-[0_15px_35px_rgba(0,0,0,0.2)] backdrop-blur-[15px] transition-all duration-500 hover:tracking-[3px] group-hover:text-white delay-500"
      >
        {children}
        <span className="absolute inset-0 h-full w-1/2 skew-x-[45deg] bg-gradient-to-l from-white/15 to-transparent transition-all delay-500 duration-500 group-hover:translate-x-[200%] group-hover:delay-0" />
      </a>
      <span className="absolute left-1/2 top-[-5px] h-[10px] w-[30px] -translate-x-1/2 rounded-[10px] bg-rose-600 shadow-bgRoseGlow transition-all  delay-0 duration-500 group-hover:top-0 group-hover:h-1/2 group-hover:w-4/5 group-hover:rounded-[30px] group-hover:delay-500" />
      <span className="absolute bottom-[-5px] left-1/2 h-[10px] w-[30px] -translate-x-1/2 rounded-[10px] bg-rose-600 shadow-bgRoseGlow transition-all delay-0 duration-500 group-hover:bottom-0 group-hover:h-1/2 group-hover:w-4/5 group-hover:rounded-[30px] group-hover:delay-500" />
    </div>
  );
}
