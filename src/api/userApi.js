import axiosClient from "../apiClient";
import URL from "../apiClient/URL";

const userApi={
    login: async(username,password)=>{
        const payload = { username, password };
        const response = await axiosClient.post(URL.LOGIN, payload);

        return response;
    },
    logout: async()=>{
        const response = await axiosClient.post(URL.LOGOUT);

        return response;
    },
    register:async(user)=>{
        const response = await axiosClient.post(URL.REGISTER, user);

        return response;
    },
};

export default userApi;