import { CreateTask } from "~/app/_components/createTask";

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-10">
      <span className="flex w-full items-center justify-center text-2xl font-bold">
        Create Task
      </span>
      <div className="w-full px-32">
        <CreateTask />
      </div>
    </div>
  );
}
