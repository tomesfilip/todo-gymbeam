import { TaskList } from "@/components/taskList";
import { getTasksByUser } from "@/server/actions";

export default async function Home() {
  const { success: tasks, error } = await getTasksByUser("3");

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 px-4 py-24 md:p-24">
      <TaskList tasks={tasks} error={error} />
    </main>
  );
}
