import axios from 'axios';
import {
    getUserToken
} from "../services/UserService";

const api_url = "http://localhost:3001/api/bookings";

const createBooking = (booking) => {
    return axios.post(api_url, booking);
}

const getIncomingBooking = (userId) => {
    return axios.get(`${api_url}/incoming/${userId}`);
}

const getOutcomingBooking = (userId) => {
    return axios.get(`${api_url}/outcoming/${userId}`);
}

const getHistoryBooking = (userId) => {
    return axios.get(`${api_url}/history/${userId}`);
}

const approveBooking = (bookingId) => {
    return axios.post(`${api_url}/${bookingId}/approve`);
}

const rejectBooking = (bookingId) => {
    return axios.post(`${api_url}/${bookingId}/reject`);
}

const payBooking = (bookingId) => {
    return axios.post(`${api_url}/${bookingId}/pay`);
}

const returnBooking = (bookingId) => {
    return axios.post(`${api_url}/${bookingId}/return`);
}

const finishBooking = (bookingId) => {
    return axios.post(`${api_url}/${bookingId}/finish`);
}




const getNextBooking = () => {
    return axios.get(`${api_url}/customers/next`, {
        headers: {
            authorization: getUserToken()
        }
    });
}

const getUserBookings = (userId) => {
    return axios.get(`${api_url}/customers/all/${userId}`, {
        headers: {
            authorization: getUserToken()
        }
    });
}

const getUserBooking = (bookingId) => {
    return axios.get(`${api_url}/customers/${bookingId}`, {
        headers: {
            authorization: getUserToken()
        }
    });
}

const modifyBooking = (booking) => {
    return axios.patch(`${api_url}/customers/${booking.id}`, booking);
}

const getAllBookings = () => {
    return axios.get(`${api_url}/customers/all`, {
        headers: {
            authorization: getUserToken()
        }
    });
}

const getBooking = (bookingId) => {
    return axios.get(`${api_url}/${bookingId}`, {
        headers: {
            authorization: getUserToken()
        }
    });
}

export {
    getNextBooking,
    createBooking,
    getUserBooking,
    getUserBookings,
    modifyBooking,
    getAllBookings,
    getBooking,
    getIncomingBooking,
    getOutcomingBooking,
    getHistoryBooking,
    approveBooking,
    rejectBooking,
    payBooking,
    returnBooking,
    finishBooking
};