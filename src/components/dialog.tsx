"use client";
import { useRef, type ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
  className?: string;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
  className = "",
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          className={`relative w-full ${maxWidth} transform rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ease-in-out ${className}`}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4"
            type="button"
            aria-label="Close dialog"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {title && (
            <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900">
              {title}
            </h3>
          )}

          <div className="mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
