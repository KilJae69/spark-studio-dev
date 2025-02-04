"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, m } from "framer-motion";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  
  return (
    <ModalContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({}) => {
  const { open, setOpen, triggerRef } = useModal();

  // Update the button's attributes based on its state
  useEffect(() => {
    const button = triggerRef.current;
    if (button) {
      button.setAttribute("data-state", open ? "opened" : "closed");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    }
  }, [open, triggerRef]);

  return (
    <button
      onClick={() => setOpen((prev: boolean) => !prev)}
      ref={triggerRef}
      className="button-two"
      aria-expanded="false"
    >
      <svg
        stroke="var(--button-color)"
        className="hamburger"
        viewBox="0 0 100 100"
        width="30"
      >
        <line
          className="line top"
          x1="90"
          x2="10"
          y1="40"
          y2="40"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="80"
          strokeDashoffset="0"
        ></line>
        <line
          className="line bottom"
          x1="10"
          x2="90"
          y1="60"
          y2="60"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="80"
          strokeDashoffset="0"
        ></line>
      </svg>
    </button>
  );
};

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { open, setOpen, triggerRef } = useModal();
  const [isClient, setIsClient] = useState(false); // Track if the code is running on the client

  useEffect(() => {
    setIsClient(true); // Set isClient to true when the component mounts (client-side)
  }, []);
  /*
  useEffect(() => {
    if (open) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "auto";
    }
  }, [open]);
*/
  const modalRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  useOutsideClick(modalRef, () => setOpen(false), triggerRef);

  if (!isClient) return null; // Don't render anything on the server

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          initial={{
            x: "100%",
          }}
          animate={{
            x: "0",
            //  backdropFilter: "blur(10px)",
          }}
          exit={{
            x: "100%",
            //  backdropFilter: "blur(0px)",
          }}
          className="fixed shadow-2xl top-2 right-2  bottom-2 overflow-hidden [perspective:800px] [transform-style:preserve-3d] z-[2000] rounded-3xl border  max-w-[70%] sm:max-w-[500px] flex items-center justify-center"
          style={{ height: "calc(100vh - 16px)" }}
        >
          <div
            ref={modalRef}
            className={cn(
              "  relative z-50 flex flex-col flex-1 overflow-y-auto",
              className
            )}
          
          >
            {children}
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
};

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col flex-1", className)}>{children}</div>
  );
};

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex justify-end p-4 bg-gray-100 dark:bg-neutral-900",
        className
      )}
    >
      {children}
    </div>
  );
};

// const Overlay = ({ className }: { className?: string }) => {
//   return (
//     <m.div
//       initial={{
//         opacity: 0,
//       }}
//       animate={{
//         opacity: 1,
//         backdropFilter: "blur(10px)",
//       }}
//       exit={{
//         opacity: 0,
//         backdropFilter: "blur(0px)",
//       }}
//       className={`fixed inset-0 h-full w-full bg-white  z-50 ${className}`}
//     ></m.div>
//   );
// };

// Hook to detect clicks outside of a component.
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: (event: MouseEvent | TouchEvent) => void,
  excludeRef?: React.RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        excludeRef?.current &&
        excludeRef.current.contains(event.target as Node)
      ) {
      
        return;
      }
      if (!ref.current || ref.current.contains(event.target as Node)) {
        
        return;
      }
      
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback, excludeRef]);
};
