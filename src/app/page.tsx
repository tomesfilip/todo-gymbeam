import { AddTaskButton } from "@/components/addTaskButton";
import { TaskItem } from "@/components/taskItem";
import { getTasks, getTasksByUser } from "@/server/actions";
import { TaskType } from "./lib/AppTypes";

export default async function Home() {
  const tasks: TaskType[] = await getTasksByUser("2");

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 px-4 py-24 md:p-24">
      <div className="max-w-xl w-full bg-grey-secondary rounded-xl p-8 relative">
        <div className="flex flex-col gap-5 overflow-auto max-h-[360px]">
          {tasks.map((task) => (
            <TaskItem key={task.id} {...task} />
          ))}
        </div>
        <AddTaskButton />
      </div>
    </main>
  );
}
