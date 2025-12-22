import { useState, useEffect } from "react";

const CreateTaskForm = ({ form, setForm, onSubmit, onCancel, editing = false }) => {
    
    // Map backend status to frontend format
    const mapBackendToFrontendStatus = (backendStatus) => {
        if (!backendStatus) return "pending";
        
        const statusLower = backendStatus.toLowerCase();
        switch(statusLower) {
            case 'completed':
                return "completed";
            case 'inprogress':
                return "in-progress";
            case 'pending':
            default:
                return "pending";
        }
    };

    // Map backend priority to frontend format
    const mapBackendToFrontendPriority = (backendPriority) => {
        if (!backendPriority) return "Medium";
        
        const priorityLower = backendPriority.toLowerCase();
        switch(priorityLower) {
            case 'low':
                return "Low";
            case 'medium':
                return "Medium";
            case 'high':
                return "High";
            case 'critical':
                return "Critical";
            default:
                return "Medium";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-xl font-bold mb-6 text-white">
                {editing ? 'Edit Task' : 'Create your Task'}
            </h2>
            <p className="text-zinc-400 mb-6">
                {editing 
                    ? 'Edit your task details below.' 
                    : 'Enter your task detail below to create your task.'
                }
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="input"
                        placeholder="Enter task title"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                        Description
                    </label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="input min-h-[100px]"
                        placeholder="Enter task description"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1">
                            Status
                        </label>
                        <select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="input"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1">
                            Priority
                        </label>
                        <select
                            value={form.priority}
                            onChange={(e) => setForm({ ...form, priority: e.target.value })}
                            className="input"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={form.startDate}
                            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                            className="input"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={form.endDate}
                            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                            className="input"
                        />
                    </div>
                </div>

                {/* Assign To */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                        Assign To
                    </label>
                    <input
                        type="text"
                        value={form.assignTo}
                        onChange={(e) => setForm({ ...form, assignTo: e.target.value })}
                        className="input"
                        placeholder="Assign task to user"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                    <button type="submit" className="btn-primary">
                        {editing ? 'Update Task' : 'Create Task'}
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

export default CreateTaskForm;