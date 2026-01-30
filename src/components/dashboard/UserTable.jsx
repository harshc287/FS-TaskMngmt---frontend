import { Edit2, Trash2, User, Mail, Shield, Calendar, MapPin } from "lucide-react";
import { useState } from "react";

const UserTable = ({ users = [], onEdit, onDelete }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-purple-500/10 text-purple-400";
      case "user":
      default:
        return "bg-blue-500/10 text-blue-400";
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);

const paginatedUsers = users.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

  

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-2xl font-bold text-white">Users List</h2>
          <p className="text-zinc-400 mt-1">Manage all users in the system</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left p-4 text-zinc-400 font-medium">Name</th>
                <th className="text-left p-4 text-zinc-400 font-medium">Email</th>
                <th className="text-left p-4 text-zinc-400 font-medium">Role</th>
                <th className="text-left p-4 text-zinc-400 font-medium">Address</th>
                <th className="text-left p-4 text-zinc-400 font-medium">Joined Date</th>
                <th className="text-left p-4 text-zinc-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id || user._id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                        <span className="font-bold text-white">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{user.name}</h4>
                        <p className="text-sm text-zinc-400">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Mail size={14} />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role || "user"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <MapPin size={14} />
                      <span className="max-w-[150px] truncate">
                        {user.address || "Not provided"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Calendar size={14} />
                      <span>{formatDate(user.createdAt)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"
                        title="View"
                      >
                        <User size={16} />
                      </button>
                      <button
                        onClick={() => onEdit && onEdit(user)}
                        className="p-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(user.id)}
                        className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="p-8 text-center text-zinc-500">
            <User size={48} className="mx-auto mb-4 text-zinc-700" />
            <h3 className="text-lg font-medium text-zinc-400 mb-2">No users found</h3>
            <p className="text-zinc-500">Add your first user to get started</p>
          </div>
        )}

        {/* Pagination */}
{totalPages > 1 && (
  <div className="p-4 border-t border-zinc-800 flex items-center justify-between">
    <p className="text-zinc-400 text-sm">
      Page <span className="font-medium">{currentPage}</span> of{" "}
      <span className="font-medium">{totalPages}</span>
    </p>

    <div className="flex gap-2">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 rounded transition-colors ${
            page === currentPage
              ? "bg-amber-500 text-black"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() =>
          setCurrentPage((p) => Math.min(p + 1, totalPages))
        }
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
)}

      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">User Details</h2>
                <button
                  onClick={closeModal}
                  className="text-zinc-400 hover:text-white p-2"
                >
                  <Trash2 size={24} />
                </button>
              </div>

              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-white">
                    {selectedUser.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                <p className="text-zinc-400 mt-1">User ID: {selectedUser.id}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail size={16} className="text-zinc-400" />
                    <p className="text-zinc-400 text-sm">Email</p>
                  </div>
                  <p className="text-white">{selectedUser.email}</p>
                </div>

                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={16} className="text-zinc-400" />
                    <p className="text-zinc-400 text-sm">Role</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(selectedUser.role)}`}>
                    {selectedUser.role || "user"}
                  </span>
                </div>

                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-zinc-400" />
                    <p className="text-zinc-400 text-sm">Address</p>
                  </div>
                  <p className="text-white">{selectedUser.address || "Not provided"}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={16} className="text-zinc-400" />
                      <p className="text-zinc-400 text-sm">Joined</p>
                    </div>
                    <p className="text-white">{formatDate(selectedUser.createdAt)}</p>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={16} className="text-zinc-400" />
                      <p className="text-zinc-400 text-sm">Last Updated</p>
                    </div>
                    <p className="text-white">{formatDate(selectedUser.updatedAt)}</p>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      if (onEdit) onEdit(selectedUser);
                      closeModal();
                    }}
                    className="flex-1 btn-primary"
                  >
                    Edit User
                  </button>
                  <button
                    onClick={() => {
                      if (onDelete) onDelete(selectedUser.id);
                      closeModal();
                    }}
                    className="flex-1 bg-red-500/20 text-red-400 px-4 py-2 rounded hover:bg-red-500/30 transition-colors"
                  >
                    Delete User
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

export default UserTable;