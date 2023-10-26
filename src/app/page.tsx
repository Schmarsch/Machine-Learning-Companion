import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      // a centered div in a main tag in the middle of the page
      <main className="relative">
        <div className="flex h-96 w-full flex-col items-center justify-center">
          <div className="text-3xl font-bold">
            Bitte Loggen Sie sich erst ein
          </div>
        </div>
      </main>
    );
  }

  const allTasks = await api.task.getAll.query();

  return (
    <main>
      <div className="flex h-12 w-full items-center justify-end px-4">
        <Link href="/task/create" className="btn btn-primary w-max">
          <div className="text-3xl">Create Task</div>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Titel</th>
              <th>Description</th>
              <th className="w-72">Done</th>
            </tr>
          </thead>
          <tbody>
            {allTasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index}</td>
                <td>
                  <Link href={`/task/${task.id}`}>
                    {task.title}
                  </Link>
                </td>
                <td>{task.description}</td>
                <td>
                  <progress
                    className="progress w-56"
                    value={task.completed ? 100 : 0}
                    max="100"
                  ></progress>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
