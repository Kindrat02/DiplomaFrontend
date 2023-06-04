/* Staff overview page */
import React from "react";
import { getLoggedInUserDetails } from "../../services/UserService";

export const EmployeeInfo = () => {
    const userData = getLoggedInUserDetails();
    return (
        <div className="container">
            <h2>Мій Профіль</h2>
            <strong>Ім'я: </strong>{userData.firstname} <br></br>
            <strong>Прізвище: </strong>{userData.lastname} <br></br>
            <strong>Електронна пошта: </strong>{userData.email} <br></br>
            <strong>Поточна позиція: </strong>{userData.usertype === "admin" ? "Адміністратор" : "Служба підтримки"} <br></br>
        </div>
    );
}