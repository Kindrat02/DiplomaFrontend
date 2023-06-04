/* Staff router */
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isUserEmployee, isUserAdmin, isUserLoggedIn } from "../services/UserService";

export const StaffRoute = () => {
    if (isUserLoggedIn() && (isUserEmployee() || isUserAdmin())) {
        return (<Outlet />);
    }
    
    return <Navigate to="/" />
}