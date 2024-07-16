import { TaskType } from "@/app/lib/AppTypes";
import { toggleCompleted } from "@/server/actions";

export const ToggleCompletedForm = ({
  id,
  userId,
  isCompleted,
}: Pick<TaskType, "id" | "userId" | "isCompleted">) => {
  // TODO: add is loading state - disable the button
  return (
    <form action={toggleCompleted}>
      <input type="hidden" name="taskId" value={id} />
      <input type="hidden" name="userId" value={userId} />
      <input
        type="hidden"
        name="isCompleted"
        value={isCompleted ? "checked" : undefined}
      />
      <button>{isCompleted ? "[x]" : "[ ]"}</button>
    </form>
  );
};
