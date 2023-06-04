/* Car service APIs */
import axios from 'axios';

const api_url = process.env.server_url || "http://localhost:3001/api/cars";

const createNewCar = (newCar) => {
    return axios.post(api_url, newCar);
}

const getAllCars = () => {
    return axios.get(api_url);
}

const getUserCars = (customerId) => {
    return axios.get(`${api_url}/user/${customerId}`);
}

const getNonVerifiedCars = () => {
    return axios.get(`${api_url}/pending`);
}

const getCar = (carId) => {
    return axios.get(`${api_url}/${carId}`);
}

const checkCarAvailability = (data) => {
    return axios.post(`${api_url}/availability`, data);
}

const searchAvailableCars = (search) => {
    return axios.post(api_url + '/search', search);
}

const filterCars = (filter) => {
    return axios.post(api_url + '/filter', filter);
}

const updateCar = (car) => {
    return axios.patch(api_url + `/${car._id}`, car);
}

export {
    createNewCar,
    getAllCars,
    getCar,
    searchAvailableCars,
    filterCars,
    updateCar,
    checkCarAvailability,
    getNonVerifiedCars,
    getUserCars
};