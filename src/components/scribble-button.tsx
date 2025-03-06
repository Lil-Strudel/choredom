"use client";
import { type HTMLMotionProps, motion } from "motion/react";

interface ScribbleButtonProps extends HTMLMotionProps<"button"> {}

export const ScribbleButton = ({ children, ...props }: ScribbleButtonProps) => {
  return (
    <motion.button
      className="mx-2 border-[3px] border-[#41403E] bg-transparent p-2 text-base [border-bottom-left-radius:15px_255px] [border-bottom-right-radius:225px_15px] [border-top-left-radius:255px_15px] [border-top-right-radius:15px_225px]"
      whileHover={{
        scale: 1.1,
        rotate: [0, -3],
        boxShadow: "2px 8px 4px -6px rgba(0,0,0,0.3)",
        transition: {
          duration: 0.2,
          rotate: {
            duration: 0.3,
            ease: "linear",
          },
        },
      }}
      whileTap={{
        scale: 0.85,
        rotate: [-6],
        boxShadow: "1px 2px 2px -1px rgba(0,0,0,0.3)",
        transition: {
          duration: 0.1,
          type: "spring",
          stiffness: 400,
        },
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
