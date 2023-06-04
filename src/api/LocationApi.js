import axios from 'axios';

const api_url = process.env.server_url || "http://localhost:3001/api/locations";

const getAllLocations = () => {
    return axios.get(api_url);
}

const getLocationFromId = (id) => {
    return axios.get(`${api_url}/${id}`);
}

const createNewLocation = (newLocation) => {
    return axios.post(api_url, newLocation);
}

const getAddressFromGeocode = (lat, lng) => {
    const url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    const formattedCoord = lat + "," + lng;
    
    const axiosThirdParty = axios.create();
    return axiosThirdParty.get(`${url + formattedCoord + "&key=" + process.env.REACT_APP_API_KEY + "&language=uk"}`);
}

const updateLocation = (location) => {
    return axios.patch(api_url + `/${location._id}`, location);
}

export {
    getAllLocations,
    getLocationFromId,
    createNewLocation,
    getAddressFromGeocode,
    updateLocation
};
