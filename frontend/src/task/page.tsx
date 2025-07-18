"use client";

import { useEffect, useState } from "react";
import { IPagination, ITask } from "./interfaces/task.interface";
import { TaskCard } from "./components/task-card.component";
import { deleteTask, fetchTasks, updateTask } from "./services/task.service";
import { TaskList } from "./components/task-list.component";

export default function TaskPage() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [pagination, setPagination] = useState<IPagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  
  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const json = await fetchTasks(page, 10);
      setTasks(json.data);
      setPagination(json.pagination);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      {loading && (
        <div className="text-center py-4 text-gray-600 animate-pulse">Loading tasks...</div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 border border-red-300 p-4 rounded-lg mb-4">
          <strong className="block font-semibold mb-1">Error</strong>
          <span>{error}</span>
        </div>
      )}
      <TaskList />
    </div>
  );
}
