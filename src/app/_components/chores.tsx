"use client";
import { useState } from "react";
import Dialog from "~/components/dialog";
import { ScribbleButton } from "~/components/scribble-button";
import { ScribbleInput } from "~/components/scribble-input";
import { api } from "~/trpc/react";

export function Chores() {
  const query = api.chore.getAll.useQuery();
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState<"new" | "onetime">("new");
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

  const utils = api.useUtils();
  const createChore = api.chore.create.useMutation({
    onSuccess: async () => {
      await utils.chore.invalidate();
    },
  });

  const createTask = api.task.create.useMutation({
    onMutate: () => {
      window.dispatchEvent(new Event("shootConfetti"));
    },
    onSuccess: async () => {
      await utils.task.invalidate();
    },
  });

  async function handleSubmit() {
    if (form.name === "" || form.value === "") return;

    if (isNaN(Number(form.value))) return;

    if (formMode === "new") {
      await createChore.mutateAsync({
        name: form.name,
        pointValue: Number(form.value),
      });
    }

    if (formMode === "onetime") {
      await createTask.mutateAsync({
        name: form.name,
        pointValue: Number(form.value),
      });
    }

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
        title={formMode === "new" ? "Add New Chore" : "One Time Chore"}
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
      <div className="absolute left-0 top-0 flex h-full w-full max-w-md flex-grow flex-col gap-4 overflow-scroll p-4">
        <Dialog
          isOpen={open}
          onClose={handleClose}
          title={formMode === "new" ? "Add New Chore" : "One Time Chore"}
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

        <ScribbleButton
          onClick={() => {
            setOpen(true);
            setFormMode("onetime");
          }}
        >
          One Time Chore
        </ScribbleButton>
        <ScribbleButton
          onClick={() => {
            setOpen(true);
            setFormMode("new");
          }}
        >
          Add New Chore
        </ScribbleButton>
      </div>
    </>
  );
}
