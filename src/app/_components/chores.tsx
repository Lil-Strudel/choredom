"use client";

import { useState } from "react";
import { ScribbleButton } from "~/components/scribble-button";
import { api } from "~/trpc/react";

export function Chores() {
  const query = api.chore.getAll.useQuery();

  const [name, setName] = useState("");
  const [pointValue, setPointValue] = useState("");

  const utils = api.useUtils();
  const createChore = api.chore.create.useMutation({
    onSuccess: async () => {
      await utils.chore.invalidate();
      setName("");
      setPointValue("");
    },
  });

  const createTask = api.task.create.useMutation({
    onSuccess: async () => {
      await utils.task.invalidate();
    },
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError || !query.isSuccess) {
    return <div>Error...</div>;
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {query.data.map((item) => (
        <ScribbleButton
          key={item.id}
          onClick={() => {
            createTask.mutate(item);
          }}
        >
          <div className="relative mx-4 flex justify-center">
            <div className="absolute right-0">+{item.pointValue}</div>
            {item.name}
          </div>
        </ScribbleButton>
      ))}
      <ScribbleButton>One Time Chore</ScribbleButton>
      <ScribbleButton>Add New Chore</ScribbleButton>
    </div>
  );
}
