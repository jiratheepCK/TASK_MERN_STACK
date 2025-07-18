import { useState, useEffect } from "react";
import { ITask } from "../interfaces/task.interface";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/task.service";
import { TaskCard } from "./task-card.component";

export function TaskList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [pagination, setPagination] = useState({ page: 1, limit: 10, count: 0 });
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newIsComplete, setNewIsComplete] = useState(false);
  const [titleError, setTitleError] = useState("");

  const loadTasks = async () => {
      const result = await fetchTasks(pagination.page, pagination.limit, search, statusFilter === 'Complete' ? true : (statusFilter === "Pending" ? false : undefined));
      setTasks(result.data);
      setPagination(result.pagination);
  };

  useEffect(() => {
    loadTasks();
  }, [pagination.page, pagination.limit, search, statusFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleAddTask = async () => {
    if (!newTitle.trim()) {
      setTitleError("Title is required.");
      return;
    };
    await createTask(newTitle, newIsComplete);
    setShowModal(false);
    setNewTitle("");
    setNewIsComplete(false);
    loadTasks();
  };

  const handleToggle = async (id: string, isComplete: boolean) => {
    await updateTask(id, { isComplete });
    loadTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    await loadTasks();
  };

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6 ml-2">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={handleSearch}
          className="p-2 border rounded-lg w-1/3"
        />
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg"
        >
          <option value="All">All</option>
          <option value="Complete">Complete</option>
          <option value="Pending">Pending</option>
        </select>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Task
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {tasks.map((task) => (
          <div style={{width: '49%'}} className="sm:w-1/3 lg:w-1/4 p-2" key={task._id}>
            <TaskCard
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
          disabled={pagination.page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {pagination.page} of {Math.ceil(pagination.count / pagination.limit)}</span>

        <button
          onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
          disabled={pagination.page * pagination.limit >= pagination.count}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              className={`w-full p-2 border rounded mb-1 ${titleError ? 'border-red-500' : ''}`}
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
                if (titleError) setTitleError("");
              }}
            />
            {titleError && <p className="text-red-500 text-sm mb-2">{titleError}</p>}
            <div className="mb-4">
              <label className="mr-2 font-medium">Status:</label>
              <select
                value={newIsComplete ? "Complete" : "Pending"}
                onChange={(e) => setNewIsComplete(e.target.value === "Complete")}
                className="p-2 border rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false); 
                  setTitleError("");
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}