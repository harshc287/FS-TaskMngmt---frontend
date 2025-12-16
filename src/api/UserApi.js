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