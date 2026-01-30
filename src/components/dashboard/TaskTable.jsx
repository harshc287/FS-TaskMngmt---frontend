import { CheckCircle, XCircle, Edit2, Eye, Calendar, User } from "lucide-react";
import { useState } from "react";

const TaskTable = ({ tasks, onToggle, onDelete, onEdit }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  // 🔹 pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const paginatedTasks = tasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "bg-red-500/10 text-red-400";
      case "high":
        return "bg-orange-500/10 text-orange-400";
      case "medium":
        return "bg-yellow-500/10 text-yellow-400";
      case "low":
        return "bg-green-500/10 text-green-400";
      default:
        return "bg-zinc-800 text-zinc-400";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-500/10 text-green-400";
      case "in progress":
      case "in-progress":
        return "bg-blue-500/10 text-blue-400";
      case "pending":
        return "bg-yellow-500/10 text-yellow-400";
      default:
        return "bg-zinc-800 text-zinc-400";
    }
  };

  const handleViewTask = (task) => setSelectedTask(task);
  const handleEditClick = (task) => onEdit && onEdit(task);
  const closeModal = () => setSelectedTask(null);

  return (
    <>
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left p-4 text-zinc-400">Title</th>
                <th className="text-left p-4 text-zinc-400">Description</th>
                <th className="text-left p-4 text-zinc-400">Status</th>
                <th className="text-left p-4 text-zinc-400">Priority</th>
                <th className="text-left p-4 text-zinc-400">Start Date</th>
                <th className="text-left p-4 text-zinc-400">End Date</th>
                <th className="text-left p-4 text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTasks.map((task) => (
                <tr key={task.id || task._id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                  <td className="p-4 text-white">{task.title}</td>
                  <td className="p-4 text-zinc-400">{task.description}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                      {task.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority || "Medium"}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-300">{task.startDate || "-"}</td>
                  <td className="p-4 text-zinc-300">{task.endDate || "-"}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => handleViewTask(task)} className="p-2 bg-blue-500/20 text-blue-400 rounded">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => handleEditClick(task)} className="p-2 bg-green-500/20 text-green-400 rounded">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => onDelete(task.id || task._id)} className="p-2 bg-red-500/20 text-red-400 rounded">
                      <XCircle size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🔹 Pagination */}
        {tasks.length > 0 && (
          <div className="p-4 border-t border-zinc-800 flex justify-between">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-zinc-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskTable;
