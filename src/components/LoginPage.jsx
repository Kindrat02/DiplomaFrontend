/* login page */
import React, { useState } from "react";
import { Form, Col, Button, Row, Alert, Container, Card } from "react-bootstrap";
import { loginUser, registerSuccessfulLoginForJwt } from "../api/UserApi";
import "../styles/alert.css";

export const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleChange = event => {
        if (event.target.name === "email") {
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        let creds = {
            email: email,
            password: password
        };

        loginUser(creds).then(res => {
            registerSuccessfulLoginForJwt(res.data.token);
            window.location.href = "/";
        }).catch((error) => {
            setErrorMessage(error.response.data.message);
        });
    }

    return (
        <div>
            {errorMessage &&
                <div className="alert-overlay">
                    <Alert variant="danger" dismissible onClose={() => setErrorMessage("")}>
                        <Alert.Heading>Не можливо увійти!</Alert.Heading>
                        <p>
                            {errorMessage}
                        </p>
                    </Alert>
                </div>
            }
            <Container>
                <Row className="vh-100 d-flex justify-content-center" style={{ marginTop: "50px" }}>
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-secondary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">DriveFleet</h2>
                                    <p className=" mb-5">Будь ласка, введіть свої пошту та пароль!</p>
                                    <div className="mb-3">
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Пошта
                                                </Form.Label>
                                                <Form.Control name="email" type="email" placeholder="Введіть пошту" onChange={handleChange} />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword">
                                                <Form.Label>Пароль</Form.Label>
                                                <Form.Control name="password" type="password" placeholder="Введіть пароль" onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox">
                                                <p className="small">
                                                    <a className="text-primary" href="#!">
                                                        Забули пароль?
                                                    </a>
                                                </p>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="secondary" type="submit">
                                                    Увійти
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Вперше?{" "}
                                                <a href="/signup" className="text-primary fw-bold">
                                                    Зареєструватися
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
    )
}