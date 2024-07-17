import { TaskType } from "@/lib/AppTypes";
import { deleteTask } from "@/server/actions";
import { toast } from "sonner";

export const DeleteForm = ({ id, userId }: Pick<TaskType, "id" | "userId">) => {
  return (
    <form
      action={async (formData) => {
        await deleteTask(formData);
        toast("Task deleted");
      }}
    >
      <input type="hidden" name="taskId" value={id} />
      <input type="hidden" name="userId" value={userId} />
      <button className="bg-red-600 p-2 rounded-lg flex items-center gap-4 text-white w-full justify-center">
        <span>Delete</span>
      </button>
    </form>
  );
};
