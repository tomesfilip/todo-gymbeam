"use client";

import { TaskType } from "@/lib/AppTypes";
import { toggleCompleted } from "@/server/actions";
import clsx from "clsx";
import { useFormStatus } from "react-dom";

export const ToggleCompletedForm = ({
  id,
  userId,
  isCompleted,
}: Pick<TaskType, "id" | "userId" | "isCompleted">) => {
  const { pending } = useFormStatus();

  return (
    <form action={toggleCompleted} className="flex items-center">
      <input type="hidden" name="taskId" value={id} />
      <input type="hidden" name="userId" value={userId} />
      <input
        type="hidden"
        name="isCompleted"
        value={isCompleted ? "checked" : "unchecked"}
      />
      <button
        aria-disabled={pending}
        disabled={pending}
        className={clsx(
          "rounded-full border-red-500 border size-5 hover:ring-2 ring-slate-400 disabled:bg-opacity-50 disabled:border-opacity-50",
          isCompleted ? "bg-red-500" : "bg-transparent",
        )}
      />
    </form>
  );
};
