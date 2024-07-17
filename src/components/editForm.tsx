"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { TaskType } from "@/lib/AppTypes";
import { editTask } from "@/server/actions";

type Props = {
  task: TaskType;
  setIsDialogOpen: (value: boolean) => void;
};

export const EditForm = ({ task, setIsDialogOpen }: Props) => {
  const ref = useRef<HTMLFormElement>(null);

  const [newTitle, setNewTitle] = useState(task.title);

  const { pending } = useFormStatus();

  const isDisabled = task.title === newTitle || newTitle.length < 1 || pending;

  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        await editTask(formData);
        toast("Task updated successfully");
        setIsDialogOpen(false);
      }}
      className="grid items-start gap-4"
    >
      <div className="grid gap-2">
        <input type="hidden" name="taskId" value={task.id} />
        <input type="hidden" name="userId" value={task.userId} />
        <label htmlFor="title">Task</label>
        <input
          type="title"
          id="title"
          name="title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="px-2 py-1 border border-gray-500 rounded-lg"
        />
      </div>
      <button
        className="bg-green-700 rounded-lg text-white px-4 py-2 disabled:bg-opacity-50 disabled:cursor-not-allowed"
        aria-disabled={isDisabled}
        disabled={isDisabled}
      >
        Save changes
      </button>
    </form>
  );
};
