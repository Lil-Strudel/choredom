"use client";

import { api } from "~/trpc/react";

export function History() {
  const query = api.task.getAllMonthly.useQuery();

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError || !query.isSuccess) {
    return <div>Error...</div>;
  }

  return (
    <div className="w-full max-w-xs">
      <div>
        {query.data.map((item) => (
          <div key={item.task.id} className="flex flex-col">
            <span>{item?.user?.name}</span>
            <span>{item.task.name}</span>
            <span>{item.task.pointValue}</span>
            <span>{item.task.createdAt.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
