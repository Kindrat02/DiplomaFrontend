import React, { useState } from "react";
import { useLocation } from "react-router-dom"
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { logout, isUserLoggedIn, isUserEmployee, isUserAdmin } from "../../services/UserService";
import { WalletButton } from "./WalletButton";

export const Header = () => {

    const location = useLocation();

    const isLoggedIn = isUserLoggedIn();
    const isAdmin = isUserAdmin();
    const isEmployee = isUserEmployee();

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/" style={{ marginLeft: "10px" }}>DriveFleet</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="container-fluid">
                    {isLoggedIn &&
                        <>
                            {!isEmployee && <Nav.Link href="/myprofile" className={location.pathname.includes("/myprofile") ? "active" : {}}>Мій Профіль</Nav.Link>}
                            {!isEmployee && <Nav.Link href="/mybookings" className={location.pathname.includes("/mybookings") ? "active" : {}}>Мої Бронювання</Nav.Link>}
                            {!isEmployee && <Nav.Link href="/locations" className={location.pathname.includes("/locations") ? "active" : {}}>Локації</Nav.Link>}
                            {!isEmployee && <Nav.Link href="/dashboard" className={location.pathname.includes("/dashboard") ? "active" : {}}>Пошук</Nav.Link>}
                            {isEmployee && <Nav.Link href={isAdmin ? "/admin/profile" : "/staff/profile"}>Панель Працівника</Nav.Link>}
                        </>
                    }
                </Nav>
                <Nav>
                    {isLoggedIn && !isEmployee &&
                        <WalletButton />
                    }
                </Nav>
                <Nav>
                    {isLoggedIn &&
                        <NavItem>
                            <Nav.Link onClick={logout}>Вихід</Nav.Link>
                        </NavItem>
                    }
                </Nav>
                <Nav>
                    {!isLoggedIn &&
                        <>
                            <Nav.Link href="/signup">Зареєструватися</Nav.Link>
                            <Nav.Link href="/login">Вхід</Nav.Link>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}