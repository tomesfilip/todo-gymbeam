import { TaskType } from "@/app/lib/AppTypes";
import { deleteTask } from "@/server/actions";

export const DeleteForm = ({ id, userId }: Pick<TaskType, "id" | "userId">) => {
  return (
    // TODO: add is loading state - disable the button
    <form action={deleteTask}>
      <input type="hidden" name="taskId" value={id} />
      <input type="hidden" name="userId" value={userId} />
      <button>X</button>
    </form>
  );
};
