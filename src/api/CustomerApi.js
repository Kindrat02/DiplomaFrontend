import axios from 'axios';

const api_url = process.env.server_url || "http://localhost:3001/api/customers/verification";

const addVerificationResult = (verificationInfo) => {
    return axios.post(api_url, verificationInfo);
}

const getNonVerifiedCustomers = () => {
    return axios.get(api_url);
}

const getLastFailedVerification = (userId) => {
    return axios.get(`${api_url}/${userId}/fail`);
}


export {
    addVerificationResult,
    getNonVerifiedCustomers,
    getLastFailedVerification
};