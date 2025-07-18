import { ITask } from "../interfaces/task.interface";
interface TaskCardProps {
  task: ITask;
  onToggle: (id: string, isComplete: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className="relative w-full mb-4 rounded-xl border border-gray-200 shadow hover:shadow-md transition-all duration-300 p-4 bg-white flex justify-between items-center">
      <button
        onClick={() => onDelete(task._id)}
        className="absolute -top-2 right-1 text-gray-400 hover:text-red-600 text-2xl font-bold cursor-pointer transition-colors"
        type="button"
      >
        &times;
      </button>

      <div className="flex flex-col justify-between">
        <p className="text-lg font-semibold text-gray-800">{task.title}</p>
        <p className="text-sm text-gray-500 mt-1">{new Date(task.createdAt).toLocaleString()}</p>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Done</label>
        <input
          id={`toggle-${task._id}`}
          type="checkbox"
          checked={task.isComplete}
          onChange={() => onToggle(task._id, !task.isComplete)}
          className="h-5 w-5 accent-green-500 cursor-pointer"
        />
      </div>
    </div>
  );
}