"use client";
import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, m } from "framer-motion";
type CustomModalProps = {
  isOpen: boolean;
  children: ReactNode;
};
export default function CustomModal({ isOpen, children }: CustomModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
console.log(isOpen);
  if (!mounted) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  const modalVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.3,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0.3,
        ease: [0.12, 0, 0.39, 0],
      },
    },
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="fixed top-0 left-0 z-50 h-screen w-full origin-top bg-black"
          variants={modalVars}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            {children}
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    modalRoot,
  );
}