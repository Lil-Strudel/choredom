"use client";

import { MonthSelector } from "~/components/month-selector";
import { useMonthContext } from "~/components/month-selector-context";
import { api } from "~/trpc/react";

export function History() {
  const { month, year } = useMonthContext();
  const query = api.task.getAllMonthly.useQuery({
    month,
    year,
  });

  if (query.isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="flex w-full max-w-xs flex-grow flex-col">
      <MonthSelector />
      <div className="relative mt-4 w-full flex-grow">
        <div className="absolute left-0 top-0 flex h-full w-full flex-col gap-4 overflow-scroll p-4">
          {query.data?.map((item) => (
            <div
              key={item.task.id}
              className="flex w-full flex-col border-[3px] border-[#41403E] bg-white p-2 outline-none [border-bottom-left-radius:15px_255px] [border-bottom-right-radius:225px_15px] [border-top-left-radius:255px_15px] [border-top-right-radius:15px_225px]"
            >
              <div className="flex w-full justify-between">
                <span className="text-sm">{item?.user?.name}</span>
                <span className="text-xs">
                  {item.task.createdAt.toLocaleString()}
                </span>
              </div>
              <div className="flex w-full justify-between">
                <span>{item.task.name}</span>
                <span>
                  {item.task.pointValue > 0 ? "+" : ""}
                  {item.task.pointValue}
                </span>
              </div>
            </div>
          ))}
          <div className="my-4" />
        </div>
      </div>
    </div>
  );
}
