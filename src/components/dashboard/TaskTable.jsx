import { CheckCircle, XCircle, Edit2, Eye, Calendar, User } from "lucide-react";
import { useState } from "react";

const TaskTable = ({ tasks, onToggle, onDelete, onEdit }) => {
  const [selectedTask, setSelectedTask] = useState(null);

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

  const toggleStatus = async (task) => {
    try {
        // Determine new status based on current status
        let newStatus;
        const currentStatus = task.status ? task.status.toLowerCase() : "pending";
        
        if (currentStatus === "completed") {
            newStatus = "pending";
        } else if (currentStatus === "inprogress") {
            newStatus = "Completed";
        } else if (currentStatus === "pending") {
            newStatus = "Inprogress";
        } else {
            newStatus = "Completed";
        }
        
        await updateTaskStatus(task.id || task._id, newStatus);
        fetchTasks();
    } catch (error) {
        console.error("Error updating status:", error);
    }
};

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  const handleEditClick = (task) => {
    if (onEdit) {
      onEdit(task);
    }
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <>
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left p-4 text-zinc-400 font-medium">Title</th>
                <th className="text-left p-4 text-zinc-400 font-medium">Description</th>
                <th className="text-left p-4 text-zinc-400 font-medium">Status</th>
                <th className="text-left p-4 text-zinc-400 font-medium">Priority</th>
                <th className="text-left p-4 text-zinc-400 font-medium">Start Date</th>
                <th className="text-left p-4 text-zinc-400 font-medium">End Date</th>
                <th className="text-left p-4 text-zinc-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id || task._id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                  <td className="p-4">
                    <div>
                      <h4 className="font-medium text-white">{task.title}</h4>
                      {task.assignTo && (
                        <div className="flex items-center gap-1 mt-1 text-sm text-zinc-400">
                          <User size={12} />
                          <span>{task.assignTo}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-zinc-400 line-clamp-2 max-w-xs">
                      {task.description}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority || "Medium"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-zinc-300">
                      <Calendar size={14} />
                      <span>{task.startDate || "-"}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-zinc-300">
                      <Calendar size={14} />
                      <span>{task.endDate || "-"}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewTask(task)}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEditClick(task)}
                        className="p-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(task.id || task._id)}
                        className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                        title="Delete"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {tasks.length === 0 && (
          <div className="p-8 text-center text-zinc-500">
            No tasks found. Create your first task!
          </div>
        )}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Task Details</h2>
                <button
                  onClick={closeModal}
                  className="text-zinc-400 hover:text-white p-2"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{selectedTask.title}</h3>
                  <p className="text-zinc-400">{selectedTask.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-zinc-400 text-sm">Status</p>
                    <span className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTask.status)}`}>
                      {selectedTask.status}
                    </span>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-zinc-400 text-sm">Priority</p>
                    <span className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedTask.priority)}`}>
                      {selectedTask.priority}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-zinc-400 text-sm">Start Date</p>
                    <p className="text-white mt-1">{selectedTask.startDate || "Not set"}</p>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-zinc-400 text-sm">End Date</p>
                    <p className="text-white mt-1">{selectedTask.endDate || "Not set"}</p>
                  </div>
                </div>

                {selectedTask.assignTo && (
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-zinc-400 text-sm">Assigned To</p>
                    <p className="text-white mt-1">{selectedTask.assignTo}</p>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => {
                      handleEditClick(selectedTask);
                      closeModal();
                    }}
                    className="btn-primary"
                  >
                    Edit Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskTable;