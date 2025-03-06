"use client";

import { api } from "~/trpc/react";

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
    <div className="w-full max-w-xs">
      <span>{pointTotal}</span>
    </div>
  );
}
