/* authenticated router */
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isUserLoggedIn, isUserEmployee } from "../services/UserService";

export const CustomerRoute = () => {
    if (isUserLoggedIn() && !isUserEmployee()) {
        return <Outlet />;
    }

    return <Navigate to="/"/>;
}