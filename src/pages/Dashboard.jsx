import { useEffect, useState } from "react";
import { List, CheckCircle, Clock, AlertCircle, Users } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import StatCard from "../components/StatCard";
import TaskTable from "../components/dashboard/TaskTable";
import UserTable from "../components/dashboard/UserTable";
import CreateTaskForm from "../components/dashboard/CreateTaskForm";
import CreateUserForm from "../components/dashboard/CreateUserForm";
import Sidebar from "../components/Sidebar";
import { getAllTasks, createTask, updateTask, updateTaskStatus, deleteTask } from "../api/TaskApi";
import { getAllUsers, createUser, updateUser, deleteUser, getLoggedUser } from "../api/UserApi";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("tasks");
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    
    // Task form state
    const [taskForm, setTaskForm] = useState({
        title: "",
        description: "",
        status: "pending",
        priority: "Medium",
        assignTo: "",
        startDate: "",
        endDate: ""
    });
    
    // User form state
    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        address: ""
    });

    useEffect(() => {
        fetchTasks();
        fetchUsers();
        fetchCurrentUser();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await getAllTasks();
            setTasks(res.data.tasks || []);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res.data || []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            const res = await getLoggedUser();
            setCurrentUser(res.data);
            // Store user info in localStorage for Sidebar
            localStorage.setItem("user", JSON.stringify(res.data));
        } catch (error) {
            console.error("Error fetching current user:", error);
            // If error, try to get from localStorage
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
            }
        }
    };

    // Task functions
    const handleCreateTask = async (formData) => {
        try {
            await createTask(formData);
            setShowCreateForm(false);
            resetTaskForm();
            fetchTasks();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleEditTask = async (formData) => {
        try {
            if (editingTask) {
                await updateTask(editingTask.id || editingTask._id, formData);
                setEditingTask(null);
                setShowCreateForm(false);
                resetTaskForm();
                fetchTasks();
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleEditTaskClick = (task) => {
        setEditingTask(task);
        setEditingUser(null);
        
        // Map backend status to frontend format
        let frontendStatus = "pending";
        if (task.status) {
            const statusLower = task.status.toLowerCase();
            if (statusLower === "completed") {
                frontendStatus = "completed";
            } else if (statusLower === "inprogress") {
                frontendStatus = "in-progress";
            } else {
                frontendStatus = "pending";
            }
        }
        
        setTaskForm({
            title: task.title || "",
            description: task.description || "",
            status: frontendStatus,
            priority: task.priority || "Medium",
            assignTo: task.assignTo || "",
            startDate: task.startDate ? task.startDate.split('T')[0] : "",
            endDate: task.endDate ? task.endDate.split('T')[0] : ""
        });
        setShowCreateForm(true);
        setActiveTab("tasks");
    };

    // User functions
    const handleCreateUser = async (formData) => {
        try {
            await createUser(formData);
            setShowCreateForm(false);
            resetUserForm();
            fetchUsers();
        } catch (error) {
            console.error("Error creating user:", error);
            alert(error.response?.data?.msg || "Error creating user");
        }
    };

    const handleEditUser = async (formData) => {
        try {
            if (editingUser) {
                // Remove password if empty (keep current password)
                const dataToSend = { ...formData };
                if (!dataToSend.password || dataToSend.password.trim() === "") {
                    delete dataToSend.password;
                }
                
                await updateUser(editingUser.id, dataToSend);
                setEditingUser(null);
                setShowCreateForm(false);
                resetUserForm();
                fetchUsers();
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert(error.response?.data?.msg || "Error updating user");
        }
    };

    const handleEditUserClick = (user) => {
        setEditingUser(user);
        setEditingTask(null);
        
        setUserForm({
            name: user.name || "",
            email: user.email || "",
            password: "", // Don't pre-fill password for security
            role: user.role || "user",
            address: user.address || ""
        });
        setShowCreateForm(true);
        setActiveTab("users");
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
                alert(error.response?.data?.msg || "Error deleting user");
            }
        }
    };

    const toggleTaskStatus = async (task) => {
        try {
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

    const removeTask = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await deleteTask(id);
                fetchTasks();
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    };

    const handleCancel = () => {
        setShowCreateForm(false);
        setEditingTask(null);
        setEditingUser(null);
        resetTaskForm();
        resetUserForm();
    };

    const resetTaskForm = () => {
        setTaskForm({
            title: "",
            description: "",
            status: "pending",
            priority: "Medium",
            assignTo: "",
            startDate: "",
            endDate: ""
        });
    };

    const resetUserForm = () => {
        setUserForm({
            name: "",
            email: "",
            password: "",
            role: "user",
            address: ""
        });
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    // Calculate stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => 
        t.status && t.status.toLowerCase() === "completed"
    ).length;
    const pendingTasks = tasks.filter(t => 
        !t.status || t.status.toLowerCase() === "pending"
    ).length;
    const inProgressTasks = tasks.filter(t => 
        t.status && t.status.toLowerCase() === "inprogress"
    ).length;
    const totalUsers = users.length;
    const adminUsers = users.filter(u => u.role === "admin").length;

    return (
        <PageWrapper>
            <div className="flex min-h-screen bg-black">
                {/* Sidebar */}
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    setShowCreateForm={setShowCreateForm}
                    currentUser={currentUser}
                    onLogout={handleLogout}
                />

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-white">Task Management System</h1>
                        <p className="text-zinc-400 mt-2">Welcome back! Manage your tasks and users efficiently.</p>
                    </header>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        <StatCard
                            title="Total Tasks"
                            value={totalTasks}
                            icon={List}
                            valueColor="text-white"
                        />
                        <StatCard
                            title="Completed"
                            value={completedTasks}
                            icon={CheckCircle}
                            valueColor="text-green-400"
                        />
                        <StatCard
                            title="In Progress"
                            value={inProgressTasks}
                            icon={Clock}
                            valueColor="text-blue-400"
                        />
                        <StatCard
                            title="Pending"
                            value={pendingTasks}
                            icon={AlertCircle}
                            valueColor="text-yellow-400"
                        />
                        <StatCard
                            title="Total Users"
                            value={totalUsers}
                            icon={Users}
                            valueColor="text-purple-400"
                        />
                    </div>

                    {/* Content Area */}
                    <div className="space-y-6">
                        {showCreateForm ? (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-white">
                                        {editingTask ? 'Edit Task' : editingUser ? 'Edit User' : activeTab === 'tasks' ? 'Create New Task' : 'Create New User'}
                                    </h2>
                                    <button
                                        onClick={handleCancel}
                                        className="btn-secondary"
                                    >
                                        Back to {activeTab === 'tasks' ? 'Tasks' : 'Users'}
                                    </button>
                                </div>
                                
                                {activeTab === "tasks" ? (
                                    <CreateTaskForm
                                        form={taskForm}
                                        setForm={setTaskForm}
                                        onSubmit={editingTask ? handleEditTask : handleCreateTask}
                                        onCancel={handleCancel}
                                        editing={!!editingTask}
                                    />
                                ) : (
                                    <CreateUserForm
                                        form={userForm}
                                        setForm={setUserForm}
                                        onSubmit={editingUser ? handleEditUser : handleCreateUser}
                                        onCancel={handleCancel}
                                        editing={!!editingUser}
                                    />
                                )}
                            </>
                        ) : activeTab === "tasks" ? (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-white">Tasks List</h2>
                                    <button
                                        onClick={() => {
                                            setEditingTask(null);
                                            setEditingUser(null);
                                            setShowCreateForm(true);
                                            resetTaskForm();
                                        }}
                                        className="btn-primary"
                                    >
                                        + Create Task
                                    </button>
                                </div>
                                <TaskTable
                                    tasks={tasks}
                                    onToggle={toggleTaskStatus}
                                    onDelete={removeTask}
                                    onEdit={handleEditTaskClick}
                                />
                            </>
                        ) : activeTab === "users" ? (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-white">All Users</h2>
                                    <button
                                        onClick={() => {
                                            setEditingTask(null);
                                            setEditingUser(null);
                                            setShowCreateForm(true);
                                            resetUserForm();
                                        }}
                                        className="btn-primary"
                                    >
                                        + Add User
                                    </button>
                                </div>
                                <UserTable
                                    users={users}
                                    onEdit={handleEditUserClick}
                                    onDelete={handleDeleteUser}
                                />
                            </>
                        ) : activeTab === "settings" ? (
                            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                                <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
                                <div className="space-y-4">
                                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-white mb-2">Account Settings</h3>
                                        <p className="text-zinc-400">Update your account information and preferences</p>
                                    </div>
                                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-white mb-2">System Settings</h3>
                                        <p className="text-zinc-400">Configure system-wide preferences</p>
                                    </div>
                                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-white mb-2">Notifications</h3>
                                        <p className="text-zinc-400">Manage your notification preferences</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                                <h2 className="text-2xl font-bold text-white mb-4">Welcome Dashboard</h2>
                                <p className="text-zinc-400">Select an option from the sidebar to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Dashboard;