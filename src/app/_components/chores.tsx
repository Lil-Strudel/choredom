"use client";

import { useState } from "react";
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
    <div>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        value={pointValue}
        onChange={(e) => {
          setPointValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          createChore.mutate({ name, pointValue: Number(pointValue) });
        }}
      >
        Add Chore
      </button>
      {query.data.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            createTask.mutate(item);
          }}
        >
          {item.name}
          {item.pointValue}
        </button>
      ))}
    </div>
  );
}
