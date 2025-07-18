import { IPagination, ITask } from "../interfaces/task.interface";

interface TaskResponse {
  data: ITask[];
  pagination: IPagination;
}

export async function fetchTasks(
  page = 1,
  limit = 10,
  title = "",
  isComplete?: boolean
): Promise<TaskResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (title) params.append("title", title);
  if (typeof isComplete === "boolean") params.append("isComplete", String(isComplete));

  const res = await fetch(`/api/tasks?${params.toString()}`);
  return res.json();
}

export async function createTask(title: string, isComplete: boolean = false): Promise<void> {
  await fetch("/api/tasks/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, isComplete }),
  });
}

export async function deleteTask(id: string): Promise<void> {
  await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
}

export async function updateTask(id: string, updates: { isComplete: boolean }): Promise<void> {
  await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
}