"use client";

import { useState } from "react";
import { IoAdd } from "react-icons/io5";

import { TaskType } from "@/lib/AppTypes";
import { AddTaskForm } from "./addForm";
import { FormDialog } from "./formDialog";
import { TaskItem } from "./taskItem";

type Props = {
  tasks?: TaskType[];
  error?: string;
};
export const TaskList = ({ tasks, error }: Props) => {
  const [isAddFormDialogOpen, setIsAddFormDialogOpen] = useState(false);

  return (
    <div className="max-w-xl w-full bg-grey-secondary rounded-xl lg:p-8 relative">
      {error && <p className="text-center text-2xl">{error}</p>}
      {tasks && tasks.length > 0 && (
        <div className="flex flex-col gap-5 overflow-auto max-h-[360px]">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
      <button
        className="rounded-full size-20 flex items-center justify-center bg-grey-primary absolute -bottom-[4rem] left-1/2 -translate-x-1/2"
        onClick={() => setIsAddFormDialogOpen(true)}
      >
        <IoAdd className="text-red size-14" />
      </button>
      <FormDialog
        title="Add task"
        description="Create a new task and add it to your todo list"
        isOpen={isAddFormDialogOpen}
        setIsOpen={setIsAddFormDialogOpen}
      >
        <AddTaskForm userId={"3"} setIsDialogOpen={setIsAddFormDialogOpen} />
      </FormDialog>
    </div>
  );
};
