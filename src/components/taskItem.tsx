"use client";

import clsx from "clsx";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { TaskType } from "../lib/AppTypes";
import { DeleteForm } from "./deleteForm";
import { EditForm } from "./editForm";
import { FormDialog } from "./formDialog";
import { ToggleCompletedForm } from "./toggleCompletedForm";

type TaskItemProps = {
  task: TaskType;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { id, userId, isCompleted, title } = task;

  return (
    <>
      <div className="h-8 flex justify-between items-center gap-2 md:gap-4 px-2 w-full">
        <ToggleCompletedForm
          id={id}
          userId={userId}
          isCompleted={isCompleted}
        />
        <p
          className={clsx("truncate w-full max-w-4/5", {
            "line-through": isCompleted,
          })}
        >
          {title}
        </p>
        <div className="flex gap-2">
          <button
            className="bg-blue-600 p-2 rounded-full"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <MdEdit color="white" />
          </button>
          <button
            className="bg-red-600 p-2 rounded-full"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <FaTrash color="white" />
          </button>
        </div>
      </div>
      <FormDialog
        title="Edit task"
        description="Make changes to your task here. Click save when you are done."
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
      >
        <EditForm task={task} setIsDialogOpen={setIsEditDialogOpen} />
      </FormDialog>
      <FormDialog
        title="Delete task"
        description="Are you sure you want to delete this task?"
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      >
        <DeleteForm userId={userId} id={id} />
      </FormDialog>
    </>
  );
};
