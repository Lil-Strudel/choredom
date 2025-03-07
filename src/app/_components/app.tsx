"use client";
import type { Session } from "next-auth";
import { useState } from "react";
import { Points } from "./points";
import { History } from "./history";
import { Leaderboard } from "./leaderboard";
import Link from "next/link";
import { ScribbleButton } from "~/components/scribble-button";

interface AppProps {
  session: Session;
}
export default function App({}: AppProps) {
  const [page, setPage] = useState<"points" | "history" | "leaderboard">(
    "points",
  );

  return (
    <main className="mx-auto flex h-full w-full max-w-2xl flex-col items-center gap-4 p-4">
      <div className="flex gap-4">
        <ScribbleButton onClick={() => setPage("points")}>
          My Points
        </ScribbleButton>
        <ScribbleButton onClick={() => setPage("history")}>
          History
        </ScribbleButton>
        <ScribbleButton onClick={() => setPage("leaderboard")}>
          Leaderboard
        </ScribbleButton>
        <Link href="/api/auth/signout">
          <ScribbleButton>Signout</ScribbleButton>
        </Link>
      </div>
      <span className="text-3xl">Welcome to</span>
      <span className="text-8xl">Choredom!</span>

      {page === "points" && <Points />}

      {page === "history" && <History />}

      {page === "leaderboard" && <Leaderboard />}
    </main>
  );
}
