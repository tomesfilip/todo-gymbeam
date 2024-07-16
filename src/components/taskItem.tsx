import clsx from "clsx";
import { TaskType } from "../app/lib/AppTypes";
import { DeleteForm } from "./deleteForm";
import { ToggleCompletedForm } from "./toggleCompletedForm";

export const TaskItem = ({
  id,
  userId,
  title,
  isCompleted,
  createdAt,
}: TaskType) => {
  return (
    <div className="h-8 px-4 flex justify-between items-center">
      <ToggleCompletedForm id={id} userId={userId} isCompleted={isCompleted} />
      <p className={clsx("truncate w-4/5", { "line-through": isCompleted })}>
        {title}
      </p>
      <DeleteForm id={id} userId={userId} />
    </div>
  );
};
