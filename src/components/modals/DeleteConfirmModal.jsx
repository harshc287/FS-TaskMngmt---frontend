const DeleteConfirmModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg border border-white/10 w-[360px]">
        <h3 className="text-lg font-semibold mb-3">Delete Task</h3>
        <p className="text-zinc-400 mb-6">
          Do you want to delete this task?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
