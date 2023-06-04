import React, { useState } from 'react';
import { Form, Col, Button, Row, Modal, Alert } from 'react-bootstrap';
import { createNewUser } from '../../api/UserApi';

import "../../styles/alert.css";

export const AddEmployee = ({ show, handleModalClose, reloadList }) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const usertype = "staff";

    const handleChange = event => {
        if (event.target.name === "firstname") {
            setFirstname(event.target.value);
        } else if (event.target.name === "lastname") {
            setLastname(event.target.value);
        } else if (event.target.name === "email") {
            setEmail(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    }

    const handleSubmit = () => {
        let newUser = {
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            email: email.trim(),
            password: password,
            usertype: usertype
        };

        createNewUser(newUser).then(() => {
            setMessage("Працівника успішно створено");
            reloadList();
        });

        handleModalClose();
    };

    return (
        <>
            {message &&
                <div className="alert-overlay">
                    <Alert variant="success" dismissible>
                        <Alert.Heading>Створення працівника</Alert.Heading>
                        <p>{message}</p>
                    </Alert>
                </div>
            }
            <Modal show={show} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Додавання працівника</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">

                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalFirstName" className="mb-3">
                                <Form.Label column sm={2}>Ім'я</Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="firstname" type="firstname" placeholder="First Name" onChange={handleChange} required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalLastName" className="mb-3">
                                <Form.Label column sm={2}>Прізвище</Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="lastname" type="lastname" placeholder="Last Name" onChange={handleChange} required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalEmail" className="mb-3">
                                <Form.Label column sm={2}>
                                    Пошта
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="email" type="email" placeholder="Email" onChange={handleChange} required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword" className="mb-3">
                                <Form.Label column sm={2}>
                                    Пароль
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="password" type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain: at least one number, one uppercase, lowercase letter, and at least 8 or more characters" placeholder="Password" onChange={handleChange} required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalUserType" className="mb-3">
                                <Form.Label column sm={2}>Позиція</Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="usertype" as="select" required disabled>
                                        <option disabled selected>Служба Підтримки</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button className="float-end" onClick={handleSubmit}>Додати</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}