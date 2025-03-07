"use client";
import { type HTMLMotionProps, motion } from "motion/react";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface ScribbleButtonProps extends HTMLMotionProps<"button"> {}

export const ScribbleButton = ({ children, ...props }: ScribbleButtonProps) => {
  const initialRotate = useMemo(
    () => Math.round((Math.random() * 5 - 2.5) * 1000) / 1000,
    [],
  );

  return (
    <motion.button
      suppressHydrationWarning
      {...props}
      className={twMerge(
        "border-[3px] border-[#41403E] bg-white p-2 [border-bottom-left-radius:15px_255px] [border-bottom-right-radius:225px_15px] [border-top-left-radius:255px_15px] [border-top-right-radius:15px_225px]",
        props.className,
      )}
      initial={{
        scale: 1,
        rotate: initialRotate,
      }}
      whileHover={{
        scale: 1.1,
        rotate: [initialRotate - 2],
        boxShadow: "2px 8px 4px -6px rgba(0,0,0,0.3)",
        transition: {
          duration: 0.3,
          type: "spring",
          stiffness: 400,
        },
      }}
      whileTap={{
        scale: 0.85,
        rotate: [initialRotate - 5],
        boxShadow: "1px 2px 2px -1px rgba(0,0,0,0.3)",
        transition: {
          duration: 0.3,
          type: "spring",
          stiffness: 400,
        },
      }}
    >
      {children}
    </motion.button>
  );
};
