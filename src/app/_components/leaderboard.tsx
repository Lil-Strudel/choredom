"use client";
import { api } from "~/trpc/react";

export function Leaderboard() {
  const query = api.task.getAllMonthly.useQuery();

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError || !query.isSuccess) {
    return <div>Error...</div>;
  }

  type user = NonNullable<(typeof query.data)[0]["user"]>;
  type task = (typeof query.data)[0]["task"];
  const grouped = query.data.reduce<
    Record<string, { user: user; tasks: task[] }>
  >((acc, cur) => {
    if (!cur.user) return acc;

    const userId = cur.user.id;
    if (!acc[userId]) {
      acc[userId] = { user: cur.user, tasks: [] };
    }
    acc[userId].tasks.push(cur.task);
    return acc;
  }, {});

  const people = Object.values(grouped)
    .map((item) => ({
      ...item,
      pointCount: item.tasks.reduce((acc, cur) => acc + cur.pointValue, 0),
    }))
    .sort((a, b) => a.pointCount - b.pointCount);

  return (
    <div className="w-full max-w-xs">
      <div>
        {people.map((item) => (
          <div key={item.user.id} className="flex flex-col">
            <span>{item.user.name}</span>
            <span>{item.pointCount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
