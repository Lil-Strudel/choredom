"use client";

import { useState } from "react";
import Dialog from "~/components/dialog";
import { ScribbleButton } from "~/components/scribble-button";
import { ScribbleInput } from "~/components/scribble-input";
import { api } from "~/trpc/react";

export function Snowball() {
  const utils = api.useUtils();
  const query = api.todo.getUncompleted.useQuery();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    value: "",
  });

  function handleClose() {
    setOpen(false);
    setForm({
      name: "",
      value: "",
    });
  }

  const createTodo = api.todo.create.useMutation({
    onSuccess: async () => {
      await utils.todo.invalidate();
    },
  });

  const completeTodo = api.todo.completeTodo.useMutation({
    onMutate: () => {
      window.dispatchEvent(new Event("shootConfetti"));
    },
    onSuccess: async () => {
      await utils.todo.invalidate();
      await utils.task.invalidate();
    },
  });

  async function handleSubmit() {
    if (form.name === "" || form.value === "") return;

    if (isNaN(Number(form.value))) return;

    await createTodo.mutateAsync({
      name: form.name,
      pointValue: Number(form.value),
    });

    handleClose();
  }

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError || !query.isSuccess) {
    return <div>Error...</div>;
  }

  return (
    <>
      <Dialog
        isOpen={open}
        onClose={handleClose}
        title={"Add item to snowball!"}
        maxWidth="max-w-sm"
      >
        <ScribbleInput
          label="Name"
          value={form.name}
          onChange={(e) =>
            setForm((oldForm) => ({ ...oldForm, name: e.target.value }))
          }
        />
        <ScribbleInput
          label="Point Value"
          type="number"
          value={form.value}
          onChange={(e) =>
            setForm((oldForm) => ({ ...oldForm, value: e.target.value }))
          }
        />
        <ScribbleButton onClick={handleSubmit} className="mt-4 w-full">
          Save
        </ScribbleButton>
      </Dialog>
      <div className="flex w-full flex-grow flex-col items-center">
        <div className="relative w-full flex-grow">
          <div className="absolute left-0 top-0 flex h-full w-full flex-grow flex-col gap-4 overflow-scroll overflow-x-hidden p-4">
            {query.data.map((item) => (
              <ScribbleButton
                key={item.id}
                onClick={() => {
                  completeTodo.mutate(item.id);
                }}
              >
                <div className="relative mx-4 flex justify-center">
                  <div className="absolute right-0">
                    {item.pointValue > 0 ? "+" : ""}
                    {item.pointValue}
                  </div>
                  {item.name}
                </div>
              </ScribbleButton>
            ))}

            <ScribbleButton
              onClick={() => {
                setOpen(true);
              }}
            >
              Add item to snowball!
            </ScribbleButton>
            <div className="my-4" />
          </div>
        </div>
      </div>
    </>
  );
}
