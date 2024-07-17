import { TaskList } from '@/components/taskList';
import { getTasksByUser } from '@/server/actions';
import { cookies } from 'next/headers';

export default async function Home() {
  const userId = cookies().get('userId');

  const { success: tasks, error } = await getTasksByUser();

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 px-4 py-24 md:p-24">
      <TaskList userId={userId?.value} tasks={tasks} error={error} />
    </main>
  );
}
