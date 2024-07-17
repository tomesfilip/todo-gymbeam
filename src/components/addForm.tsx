"use client";

import { addTask } from "@/server/actions";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

type Props = {
  setIsDialogOpen: (value: boolean) => void;
};

export const AddTaskForm = ({ setIsDialogOpen }: Props) => {
  const ref = useRef<HTMLFormElement>(null);

  const { pending } = useFormStatus();

  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        await addTask(formData);
        toast("Task added successfully");
        setIsDialogOpen(false);
      }}
      className="grid items-start gap-4"
    >
      <div className="grid gap-2">
        <label htmlFor="title">Task title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Go to dentist"
          className="px-2 py-1 border border-gray-500 rounded-lg"
        />
      </div>
      <button
        className="bg-green-700 rounded-lg text-white px-4 py-2 disabled:bg-opacity-50 disabled:cursor-not-allowed"
        aria-disabled={pending}
        disabled={pending}
      >
        Save changes
      </button>
    </form>
  );
};
