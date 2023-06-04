import jwt_decode from 'jwt-decode';

export const TOKEN_SESSION_ATTRIBUTE_NAME = "token";
export const TOKEN_HEADER_LENGTH = 7;

const isUserLoggedIn = () => {
    let user = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
    return user === null ? false : true;
}

const isUserCustomer = () => {
    let user = getLoggedInUserDetails();
    return user.usertype === "customer" ? true : false;
}

const isUserStaff = () => {
    let user = getLoggedInUserDetails();
    return user.usertype === "staff" ? true : false;
}

const isUserAdmin = () => {
    let user = getLoggedInUserDetails();
    return user.usertype === "admin" ? true : false;
}

const isUserEmployee = () => {
    return isUserAdmin() || isUserStaff();
}

const logout = () => {
    localStorage.removeItem(TOKEN_SESSION_ATTRIBUTE_NAME);
    window.location.href = "/";
}

const getLoggedInUserID = () => {
    let token = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
    if (token === null) 
        return "";
    return jwt_decode(token.slice(TOKEN_HEADER_LENGTH)).id;
}

const getLoggedInUserDetails = () => {
    let token = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
    if (token === null) 
        return "";
    return jwt_decode(token.slice(TOKEN_HEADER_LENGTH));
}

const getUserToken = () => {
    let token = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
    if (token === null) 
        return "";
    return token.slice(TOKEN_HEADER_LENGTH);
}

export {isUserLoggedIn,
        isUserStaff,
        isUserEmployee,
        isUserAdmin,
        isUserCustomer,
        getUserToken,
        getLoggedInUserID,
        getLoggedInUserDetails,
        logout};