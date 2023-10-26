import { api } from "~/trpc/server";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const task = await api.task.getbyId.query({ id: params.id });

  if (!task) notFound();

  return <div>Task: {task.title}</div>;
}
