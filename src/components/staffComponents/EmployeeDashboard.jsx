/* Staff dashboard page/wrapper */
import React from 'react';
import { Container, Col, Row } from "react-bootstrap";
import { isUserAdmin, isUserStaff } from "../../services/UserService";
import "../../styles/staffDashboard.css";

const FunctionSelectedStyle = {
    borderBottom: "4px solid white",
    textDecoration: "none",
    color: "white"
};

const FunctionNotSelectedStyle = {
    textDecoration: "none",
    color: "white"
};

export const EmployeeDashboard = (props) => {
    const isAdmin = isUserAdmin();
    const currentLocation = window.location.pathname;

    return (
        <Container style={{ margin: "0", padding: "0", maxWidth: "100%" }}>
            <Row style={{ margin: "0" }}>
                <Col className="sidenav" md={2}>
                    <h3>Панель {isUserAdmin() ? "Адміністратора" : "Працівника"}</h3>
                    <p><a href={isAdmin ? "/admin/profile" : "/staff/profile"} style={currentLocation.includes("profile") ? FunctionSelectedStyle : FunctionNotSelectedStyle}>Мій Профіль</a></p>
                    <p><a href={isAdmin ? "/admin/view/customers" : "/staff/view/customers"} style={currentLocation.includes("view/customers") ? FunctionSelectedStyle : FunctionNotSelectedStyle}>Клієнти</a></p>
                    <p><a href="/admin/view/bookings" style={(currentLocation === "/admin/view/bookings") ? FunctionSelectedStyle : FunctionNotSelectedStyle}>Замовлення</a></p>
                    <p><a href="/admin/view/cars" style={(currentLocation === "/admin/view/cars") ? FunctionSelectedStyle : FunctionNotSelectedStyle}>Машини</a></p>
                    {
                        isUserAdmin() &&
                            <p><a href="/admin/view/employees" style={(currentLocation === "/admin/view/employees") ? FunctionSelectedStyle : FunctionNotSelectedStyle}>Працівники</a></p>
                    }
                    {
                        isUserStaff() &&
                        <>
                            <p><a href="/staff/verify/cars" style={(currentLocation === "/staff/verify/cars") ? FunctionSelectedStyle : FunctionNotSelectedStyle}>Верифікація Автівок</a></p>
                            <p><a href="/staff/verify/customers" style={(currentLocation === "/staff/verify/customers") ? FunctionSelectedStyle : FunctionNotSelectedStyle}>Верифікація Користувачів</a></p>
                        </>
                    }
                </Col>
                <Col className="main" md={10} style={{ paddingTop: '5vh' }}>
                    {props.children}
                </Col>
            </Row>
        </Container>
    );
}
