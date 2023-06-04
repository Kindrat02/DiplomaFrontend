import React, { useState } from "react";
import { Form, Col, Button, Row, Card, Container, Alert } from "react-bootstrap";
import { createNewUser, loginUser, registerSuccessfulLoginForJwt } from "../api/UserApi";
import "../styles/alert.css";

export const SignUpPage = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = event => {
        if (event.target.name === "firstname") {
            setFirstname(event.target.value);
        } else if (event.target.name === "lastname") {
            setLastname(event.target.value);
        } else if (event.target.name === "email") {
            setEmail(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        } else if (event.target.name === "confirmPassword") {
            setConfirmPassword(event.target.value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (confirmPassword !== password) {
            setErrorMessage("Паролі не однакові");
            return;
        }

        let newUser = {
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            email: email,
            password: password,
            usertype: "customer"
        };

        createNewUser(newUser).then(() => {
            loginUser({ email: email, password: password }).then(res => {
                registerSuccessfulLoginForJwt(res.data.token);
                window.location.href = "/";
            })
        }).catch((error) => {
            setErrorMessage(error.response.data.message);
        });
    }

    return (
        <div>
            {errorMessage &&
                <div className="alert-overlay">
                    <Alert variant="danger" dismissible>
                        <Alert.Heading>Зареструватися не вдалося!</Alert.Heading>
                        <p>{errorMessage}</p>
                    </Alert>
                </div>
            }
            <Container>
                <Row className="vh-100 d-flex justify-content-center" style={{ marginTop: "25px" }}>
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-secondary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">DriveFleet</h2>
                                    <p className=" mb-5">Уведіть дані для реєстрації</p>
                                    <div className="mb-3">
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                                <Form.Label className="text-center">Ім'я</Form.Label>
                                                <Form.Control name="firstname" placeholder="Введіть ім'я" onChange={handleChange} required />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Label>Прізвище</Form.Label>
                                                <Form.Control name="lastname" placeholder="Введіть прізвище" onChange={handleChange} required />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Пошта</Form.Label>
                                                <Form.Control name="email" type="email" placeholder="Введіть пошту" onChange={handleChange} required />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Пароль</Form.Label>
                                                <Form.Control type="password" name="password" placeholder="Введіть пароль" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Має містити: принаймні одну цифру, одну велику, малу літеру та принаймні 8 або більше символів" onChange={handleChange} required />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                                <Form.Label>Підтвердіть пароль</Form.Label>
                                                <Form.Control type="password" name="confirmPassword" placeholder="Повторіть пароль" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Має містити: принаймні одну цифру, одну велику, малу літеру та принаймні 8 або більше символів" onChange={handleChange} required />
                                            </Form.Group>
                                            
                                            <div className="d-grid">
                                                <Button variant="secondary" type="submit">
                                                    Зареєструватися
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Уже зареєстровані?{" "}
                                                <a href="/login" className="text-primary fw-bold">
                                                    Увійти
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}