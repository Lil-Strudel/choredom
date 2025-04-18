"use client";
import type { Session } from "next-auth";
import { useState } from "react";
import { Points } from "./points";
import { History } from "./history";
import { Leaderboard } from "./leaderboard";
import Link from "next/link";
import { ScribbleButton } from "~/components/scribble-button";
import Confetti from "~/components/confetti";
import { Snowball } from "./snowball";

interface AppProps {
  session: Session;
}
export default function App({}: AppProps) {
  const [page, setPage] = useState<
    "points" | "snowball" | "history" | "leaderboard"
  >("points");

  return (
    <main className="mx-auto flex h-full w-full max-w-2xl flex-col items-center gap-4 p-4">
      <div className="flex max-w-full gap-2 overflow-x-scroll py-1 sm:gap-4">
        <ScribbleButton
          onClick={() => setPage("points")}
          className="w-fit text-sm"
        >
          My Points
        </ScribbleButton>
        <ScribbleButton
          onClick={() => setPage("snowball")}
          className="w-fit text-sm"
        >
          Snowball
        </ScribbleButton>
        <ScribbleButton onClick={() => setPage("history")} className="text-sm">
          History
        </ScribbleButton>
        <ScribbleButton
          onClick={() => setPage("leaderboard")}
          className="text-sm"
        >
          Leaderboard
        </ScribbleButton>
        <Link href="/api/auth/signout" className="h-full">
          <ScribbleButton className="h-full text-sm">Signout </ScribbleButton>
        </Link>
      </div>
      <span className="text-2xl sm:text-3xl">Welcome to</span>
      <span className="text-6xl/3 sm:text-8xl">Choredom!</span>

      {page === "points" && <Points />}
      {page === "snowball" && <Snowball />}
      {page === "history" && <History />}
      {page === "leaderboard" && <Leaderboard />}
      <Confetti />
    </main>
  );
}
