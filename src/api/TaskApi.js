import axiosInstance from "./axiosInstance";

/* ================= TASK APIS ================= */

// GET ALL TASKS (ADMIN)
export const getAllTasks = () => {
    return axiosInstance.get("/tasks/getTasks");
};

// CREATE TASK (ADMIN)
export const createTask = (data) => {
    // Map status to match backend ENUM
    const mappedData = {
        ...data,
        status: mapStatusToBackend(data.status),
        priority: mapPriorityToBackend(data.priority)
    };
    return axiosInstance.post("/tasks/createTask", mappedData);
};

// UPDATE TASK (ADMIN)
export const updateTask = (id, data) => {
    // Map status to match backend ENUM
    const mappedData = {
        ...data,
        status: mapStatusToBackend(data.status),
        priority: mapPriorityToBackend(data.priority)
    };
    return axiosInstance.put(`/tasks/updateTask/${id}`, mappedData);
};

// UPDATE STATUS (ADMIN)
export const updateTaskStatus = (id, status) => {
    // Map status to match backend ENUM
    const mappedStatus = mapStatusToBackend(status);
    return axiosInstance.patch(`/tasks/statusUpdate/${id}`, { 
        status: mappedStatus 
    });
};

// DELETE TASK (ADMIN)
export const deleteTask = (id) => {
    return axiosInstance.delete(`/tasks/deleteTask/${id}`);
};

// Helper function to map frontend status to backend ENUM
const mapStatusToBackend = (status) => {
    if (!status) return 'pending';
    
    const statusLower = status.toLowerCase();
    
    switch(statusLower) {
        case 'completed':
            return 'Completed';
        case 'in progress':
        case 'in-progress':
        case 'inprogress':
            return 'Inprogress';
        case 'pending':
        default:
            return 'pending';
    }
};

// Helper function to map frontend priority to backend ENUM
const mapPriorityToBackend = (priority) => {
    if (!priority) return 'Medium';
    
    const priorityLower = priority.toLowerCase();
    
    switch(priorityLower) {
        case 'low':
            return 'Low';
        case 'medium':
            return 'Medium';
        case 'high':
            return 'High';
        case 'critical':
            return 'critical';
        default:
            return 'Medium';
    }
};