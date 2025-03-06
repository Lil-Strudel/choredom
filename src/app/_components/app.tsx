"use client";
import type { Session } from "next-auth";
import { useState } from "react";
import { Points } from "./points";
import { History } from "./history";
import { Leaderboard } from "./leaderboard";
import { Chores } from "./chores";
import Link from "next/link";

interface AppProps {
  session: Session;
}
export default function App({}: AppProps) {
  const [page, setPage] = useState<"points" | "history" | "leaderboard">(
    "points",
  );

  return (
    <main className="mx-auto flex h-full w-full max-w-2xl flex-col items-center">
      <div className="flex gap-2">
        <button onClick={() => setPage("points")}>My Points</button>
        <button onClick={() => setPage("history")}>History</button>
        <button onClick={() => setPage("leaderboard")}>Leaderboard</button>
        <Link href="/api/auth/signout">Signout</Link>
      </div>
      <span className="text-4xl">Welcome to</span>
      <span className="text-8xl">Choredom!</span>

      {page === "points" && (
        <div>
          <Points />
        </div>
      )}

      {page === "history" && (
        <div>
          <History />
        </div>
      )}

      {page === "leaderboard" && (
        <div>
          <Leaderboard />
        </div>
      )}

      <Chores />
    </main>
  );
}
