import React, { Component } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isUserLoggedIn, isUserAdmin } from "../services/UserService";

class AdminRoute extends Component {
    render() {
        if (isUserLoggedIn() && isUserAdmin()) {
            return <Outlet />;
        } else {
            return <Navigate to="/" />;
        }
    }
}

export default AdminRoute;
