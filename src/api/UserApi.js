import axiosInstance from "./axiosInstance";

const sleep = () =>{
    return new Promise((resolve) =>{
        setTimeout(resolve, 3000);
    })
};

export const registerUser = async (data) =>{
    await sleep()
    return axiosInstance.post("/users/register", data)
};

export const loginUser = async (data) =>{
    await sleep();
    return axiosInstance.post("/users/login", data)
}

export const getLoggedUser = async() => {
    await sleep();
  return axiosInstance.get("/users/getUserInfo");
};

// GET ALL USERS (ADMIN)
export const getAllUserList = async() => {
    await sleep();
  return axiosInstance.get("/users/getAllUsers");
};


/* ================= USER APIS ================= */
export const getAllUsers = () => {
    return axiosInstance.get("/users/getAllUsers");
};

// CREATE USER (ADMIN)
export const createUser = (data) => {
    return axiosInstance.post("/users/register", data);
};

// UPDATE USER (ADMIN)
export const updateUser = (id, data) => {
    return axiosInstance.put(`/users/admin/updateUser/${id}`, data);
};

// DELETE USER (ADMIN)
export const deleteUser = (id) => {
    return axiosInstance.delete(`/users/admin/deleteUser/${id}`);
};

// GET USER BY ID
export const getUserById = (id) => {
    return axiosInstance.get(`/users/getUser/${id}`);
};

export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
};