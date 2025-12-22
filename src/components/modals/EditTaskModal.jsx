import { X } from "lucide-react";
import { useState, useEffect } from "react";

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [form, setForm] = useState(task);

  useEffect(() => {
    setForm(task);
  }, [task]);

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-[420px] rounded-lg border border-white/10 p-6">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Task</h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-3">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="input"
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="input"
          >
            <option value="pending">Pending</option>
            <option value="Inprogress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="input"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 bg-amber-500 text-black rounded"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
