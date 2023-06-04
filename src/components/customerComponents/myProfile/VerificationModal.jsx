import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import { getLoggedInUserID } from "../../../services/UserService";
import { addCustomerInfo } from "../../../api/UserApi";
import { FILE_UPLOAD_LIMIT } from "../../../Constants";

export const VerificationModal = ({ show, handleClose }) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [wallet, setWallet] = useState("");
    const [driverLicence, setDriverLicence] = useState("");
    const [passport, setPassport] = useState("");

    const handleChange = event => {
        if (event.target.name === "phonenumber") {
            setPhoneNumber(event.target.value);
        } else if (event.target.name === "wallet") {
            setWallet(event.target.value);
        }
    }

    const handleFile = (event) => {
        let files = event.target.files;
        if (files !== null) {
            if (event.target.files[0].size > FILE_UPLOAD_LIMIT) {
                alert("ERROR");
            }
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            const eventName = event.target.name;
            reader.onload = (event) => {
                if (eventName === "passport") {
                    setPassport(event.target.result);
                } else if (eventName === "licence") {
                    setDriverLicence(event.target.result);
                }
            };
        }
    }

    const handleSubmit = event => {
        event.preventDefault();

        let customerInfo = {
            wallet: wallet,
            phoneNumber: "+380" + phoneNumber,
            driverLicencePhoto: driverLicence,
            passportPhoto: passport
        };

        addCustomerInfo({
            user: getLoggedInUserID(),
            customerInfo: customerInfo
        }).then(() => {
            handleClose();
            window.location.reload(false);
        }).catch((error) => {
            console.log(error.response.data.message);
        });
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Верифікація особистості</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="formHorizontalFirstName" className="mb-3">
                            <Form.Label column sm={2}>Гаманець</Form.Label>
                            <Col sm={10}>
                                <Form.Control  title="Не відповідає стандартному формату гаманця" name="wallet" placeholder="Введіть гаманець" onChange={handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalFirstName" className="mb-3">
                            <Form.Label column sm={2}>Номер телефону</Form.Label>
                            <Col sm={10}>
                                <InputGroup>
                                    <InputGroup.Text style={{ marginTop: "15px" }}>+380</InputGroup.Text>
                                    <Form.Control style={{ marginTop: "15px" }} name="phonenumber" placeholder="Введіть номер телефону" onChange={handleChange} required />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalPassport" className="mb-3">
                            <Form.Label column sm={2}>Паспорт</Form.Label>
                            <Col sm={10}>
                                <Form.Control name="passport" type="file" placeholder="Додайте фото паспорта" onChange={handleFile} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalDriverLicence" className="mb-3">
                            <Form.Label column sm={2}>Водійське посвідч.</Form.Label>
                            <Col sm={10}>
                                <Form.Control style={{ marginTop: "15px" }} name="licence" type="file" placeholder="Додайте фото посвідчення" onChange={handleFile} required />
                            </Col>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Зберегти
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}