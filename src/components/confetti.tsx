"use client";

import { useEffect, useRef } from "react";
import JSConfetti from "js-confetti";

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function shootConfetti() {
    const canvas = canvasRef.current ?? undefined;
    if (canvas) {
      canvas.style.display = "block";
      const confetti = new JSConfetti({ canvas });
      await confetti
        .addConfetti({
          confettiNumber: 300,
        })
        .then(() => (canvas.style.display = "none"));
    }
  }

  useEffect(() => {
    // Event listener
    const handleCustomEvent = async () => {
      await shootConfetti();
    };

    // Add event listener
    window.addEventListener(
      "shootConfetti",
      handleCustomEvent as EventListener,
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        "shootConfetti",
        handleCustomEvent as EventListener,
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        bottom: 0,
        left: 0,
        display: "none",
        pointerEvents: "none",
      }}
    />
  );
}
