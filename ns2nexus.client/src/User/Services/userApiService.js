import axios from "axios";

const apiUrl = "http://localhost:5173" || "http://localhost:7105";

export const login = async (user) => {
    try {
        const { data } = await axios.post(`${apiUrl}/users/login`, user);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error.message);
    }
};

export const signup = async (normalizedUser) => {
    try {
        const { data } = await axios.post(`${apiUrl}/users`, normalizedUser);
        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
};

export const getUserData = async () => {
    try {
        const { data } = await axios.get(`${apiUrl}/user`);
        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
};
