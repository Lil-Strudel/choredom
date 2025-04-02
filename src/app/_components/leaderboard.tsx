"use client";
import { MonthSelector } from "~/components/month-selector";
import { useMonthContext } from "~/components/month-selector-context";
import { api } from "~/trpc/react";

export function Leaderboard() {
  const { month, year } = useMonthContext();
  const query = api.task.getAllMonthly.useQuery({
    month,
    year,
  });

  if (query.isError) {
    return <div>Error...</div>;
  }

  type user = NonNullable<NonNullable<typeof query.data>[number]["user"]>;
  type task = NonNullable<typeof query.data>[number]["task"];
  const grouped =
    query.data?.reduce<Record<string, { user: user; tasks: task[] }>>(
      (acc, cur) => {
        if (!cur.user) return acc;

        const userId = cur.user.id;
        if (!acc[userId]) {
          acc[userId] = { user: cur.user, tasks: [] };
        }
        acc[userId].tasks.push(cur.task);
        return acc;
      },
      {},
    ) ?? {};

  const people = Object.values(grouped)
    .map((item) => ({
      ...item,
      pointCount: item.tasks.reduce((acc, cur) => acc + cur.pointValue, 0),
    }))
    .sort((a, b) => b.pointCount - a.pointCount);

  function ordinalSuffix(i: number) {
    const j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }

  return (
    <div className="w-full max-w-xs">
      <MonthSelector />
      <div className="mt-4 flex flex-col gap-4">
        {people.map((item, idx) => (
          <div
            key={item.user.id}
            className="flex w-full flex-col border-[3px] border-[#41403E] bg-white p-2 outline-none [border-bottom-left-radius:15px_255px] [border-bottom-right-radius:225px_15px] [border-top-left-radius:255px_15px] [border-top-right-radius:15px_225px]"
          >
            <div className="flex items-center gap-6">
              <div>
                <span className="text-4xl">{ordinalSuffix(idx + 1)}</span>
              </div>
              <div className="flex flex-col">
                <span>{item.user.name}</span>
                <span>{item.pointCount} points</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
