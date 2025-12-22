import { useState } from "react";

const CreateUserForm = ({ form, setForm, onSubmit, onCancel, editing = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
      <h2 className="text-xl font-bold mb-6 text-white">
        {editing ? 'Edit User' : 'Create New User'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input"
              placeholder="Enter email address"
              required
            />
          </div>
        </div>

        {/* Password (only for create, optional for edit) */}
        {!editing ? (
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input pr-10"
                placeholder="Enter password"
                required={!editing}
                minLength="6"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-1">Minimum 6 characters</p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              New Password (Optional)
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password || ""}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input pr-10"
                placeholder="Leave empty to keep current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Role *
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="input"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Address
            </label>
            <input
              type="text"
              value={form.address || ""}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="input"
              placeholder="Enter address (optional)"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button type="submit" className="btn-primary">
            {editing ? 'Update User' : 'Create User'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;