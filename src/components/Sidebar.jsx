import { Home, PlusCircle, List, Users, Settings, LogOut, User } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, setShowCreateForm, currentUser, onLogout }) => {
    const menuItems = [
        { id: "home", label: "Home", icon: Home },
        { id: "tasks", label: "Tasks List", icon: List },
        { id: "users", label: "All Users", icon: Users },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const handleMenuItemClick = (itemId) => {
        setActiveTab(itemId);
        setShowCreateForm(false);
    };

    // Get user info from localStorage if not provided
    const user = currentUser || JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6 min-h-screen flex flex-col">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-white">Task Management</h2>
                <p className="text-zinc-400 text-sm">Version 1.0</p>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Quick Actions</h3>
                <button
                    onClick={() => {
                        setActiveTab("tasks");
                        setShowCreateForm(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors mb-2"
                >
                    <PlusCircle size={20} />
                    <span className="font-medium">Create Task</span>
                </button>
                <button
                    onClick={() => {
                        setActiveTab("users");
                        setShowCreateForm(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
                >
                    <Users size={20} />
                    <span className="font-medium">Add User</span>
                </button>
            </div>

            {/* Main Navigation */}
            <nav className="space-y-2 flex-1">
                {menuItems.map((item) => {
                    const isActive = activeTab === item.id;
                    
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleMenuItemClick(item.id)}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                                isActive
                                    ? "bg-zinc-800 text-white"
                                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                            }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* User info and Logout */}
            <div className="mt-auto pt-6 border-t border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
                        {user.name ? (
                            <span className="text-xl font-bold text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        ) : (
                            <User size={24} className="text-zinc-400" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">
                            {user.name || "User"}
                        </p>
                        <p className="text-zinc-400 text-sm capitalize">
                            {user.role || "User"}
                        </p>
                    </div>
                </div>
                
                {/* Logout Button */}
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
                >
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
                </button>
                
                {/* Current User Info */}
                <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg">
                    <p className="text-xs text-zinc-500">Logged in as:</p>
                    <p className="text-sm text-zinc-300 truncate">{user.email || "user@example.com"}</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;