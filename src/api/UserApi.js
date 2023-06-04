import axios from 'axios';
import {
    isUserLoggedIn,
    TOKEN_SESSION_ATTRIBUTE_NAME
} from '../services/UserService';

const api_url = process.env.server_url || "http://localhost:3001/api/users";

const getAllEmployees = () => {
    return axios.get(api_url + "/employees");
}

const getAllCustomers = () => {
    return axios.get(api_url + "/customers");
}

const getUserById = (id) => {
    return axios.get(`${api_url}/${id}`);
}

const createNewUser = (newUser) => {
    return axios.post(api_url, newUser);
}

const loginUser = (creds) => {
    return axios.post(`${api_url}/login`, creds);
}

const addCustomerInfo = (customer) => {
    return axios.put(`${api_url}/verification`, customer);
}

const deleteEmployeeById = (id) => {
    return axios.delete(`${api_url}/${id}`);
} 

const registerSuccessfulLoginForJwt = (token) => {
    localStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, token);
    setupAxiosInterceptors(token);
}

const setupAxiosInterceptors = (token) => {
    axios.interceptors.request.use(
        (config) => {
            if (isUserLoggedIn()) {
                config.headers.authorization = token;
            }
            return config;
        }
    );
}

export {
    getAllEmployees,
    getAllCustomers,
    getUserById,
    createNewUser,
    loginUser,
    deleteEmployeeById,
    addCustomerInfo,
    registerSuccessfulLoginForJwt,
    setupAxiosInterceptors,
};