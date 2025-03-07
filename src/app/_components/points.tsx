"use client";

import { api } from "~/trpc/react";
import { Chores } from "./chores";

export function Points() {
  const query = api.task.getUsersMonthly.useQuery();

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError || !query.isSuccess) {
    return <div>Error...</div>;
  }

  const pointTotal = query.data.reduce((acc, cur) => acc + cur.pointValue, 0);

  return (
    <div className="flex w-full flex-grow flex-col items-center">
      <span className="text-lg">you are at</span>
      <span className="text-6xl">{pointTotal}</span>
      <span className="text-lg">points</span>
      <div className="relative w-full flex-grow">
        <Chores />
      </div>
    </div>
  );
}
