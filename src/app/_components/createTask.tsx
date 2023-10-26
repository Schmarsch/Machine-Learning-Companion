"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateTask() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTask = api.task.createNew.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTask.mutate({ title, description });
      }}
      className="flex flex-col space-y-4"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea textarea-bordered h-40"
        cols={200}
      />
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={createTask.isLoading}
      >
        {createTask.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}
