"use client"
import { m } from "framer-motion";
import { FiBatteryCharging, FiWifi } from "react-icons/fi";

import { Link } from "@/i18n/routing";
import Image from "next/image";

const Phone3D = () => {
  return (
    <section className="grid place-content-center bg-transparent">
      <FloatingPhone />
    </section>
  );
};

const FloatingPhone = () => {
  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateY(-30deg) rotateX(15deg)",
      }}
      className="rounded-[24px] bg-primary-accent"
    >
      <m.div
        initial={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        animate={{
          transform: "translateZ(32px) translateY(-8px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
          ease: "easeInOut",
        }}
        className="relative h-[420px] w-56 rounded-[24px] border-2 border-b-4 border-r-4 border-white border-l-neutral-200 border-t-neutral-200 bg-neutral-900 p-1 pl-[3px] pt-[3px]"
      >
        <HeaderBar />
        <Screen />
      </m.div>
    </div>
  );
};

const HeaderBar = () => {
  return (
    <>
      <div className="absolute left-[50%] top-2.5 z-10 h-2 w-16 -translate-x-[50%] rounded-md bg-primary-600"></div>
      <div className="absolute right-3 top-2 z-10 flex gap-2">
        <FiWifi className="text-primary-600" />
        <FiBatteryCharging className="text-primary-600" />
      </div>
    </>
  );
};

const Screen = () => {
   
  return (
    <div className="relative z-0 grid h-full w-full place-content-center overflow-hidden rounded-[20px] bg-white">
      {/* Example logo from logoispum */}
      <Image className="absolute top-5 left-1 right-0" src={"/mobile-view-spark.png"} alt="spark mobile view" width={200} height={200}/>
      
      
      

      <Link href="/contact" className="absolute text-center shadow-lg bottom-4 left-4 right-4 z-10 rounded-lg border-[1px] bg-white py-2 text-sm font-medium text-primary-accent backdrop-blur hover:scale-110 transition">
        Get Started
      </Link>
      

     {/* <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary-500" />  */}
      <div className="absolute -bottom-72 left-[50%] h-96 w-96 -translate-x-[50%] rounded-full bg-primary-600" />
    </div>
  );
};

export default Phone3D;