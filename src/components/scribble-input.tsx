"use client";
import { type HTMLMotionProps, motion } from "motion/react";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface ScribbleInputProps extends HTMLMotionProps<"input"> {
  label?: string;
}

export const ScribbleInput = ({ label, ...props }: ScribbleInputProps) => {
  const initialRotate = useMemo(
    () => Math.round((Math.random() * 3 - 1.5) * 1000) / 1000,
    [],
  );

  return (
    <div className="relative">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <motion.input
        suppressHydrationWarning
        {...props}
        className={twMerge(
          "w-full border-[3px] border-[#41403E] bg-white p-2 outline-none [border-bottom-left-radius:15px_255px] [border-bottom-right-radius:225px_15px] [border-top-left-radius:255px_15px] [border-top-right-radius:15px_225px]",
          props.className,
        )}
        initial={{
          scale: 1,
          rotate: initialRotate,
        }}
        whileHover={{
          scale: 1.02,
          rotate: [initialRotate - 1],
          boxShadow: "2px 8px 4px -6px rgba(0,0,0,0.3)",
          transition: {
            duration: 0.3,
            type: "spring",
            stiffness: 400,
          },
        }}
        whileFocus={{
          scale: 1.02,
          rotate: [initialRotate - 1],
          boxShadow: "2px 8px 4px -6px rgba(0,0,0,0.3)",
          transition: {
            duration: 0.3,
            type: "spring",
            stiffness: 400,
          },
        }}
      />
    </div>
  );
};
