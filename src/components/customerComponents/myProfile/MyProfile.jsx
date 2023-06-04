import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Badge, Row, Col, Card, Modal } from "react-bootstrap";
import { CarList } from "./CarList";
import { getLoggedInUserID } from "../../../services/UserService";
import { getUserById } from "../../../api/UserApi";
import { getLastFailedVerification } from "../../../api/CustomerApi";
import { VerificationModal } from "./VerificationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";

export const MyProfile = () => {
    const [modalVisibility, setModalVisibility] = useState(false);
    const [viewDocuments, setViewDocuments] = useState(false);
    const [user, setUser] = useState({});
    const [failedMessage, setFailedMessage] = useState(null);

    useEffect(() => {
        getUserById(getLoggedInUserID()).
            then(res => {
                const tempUser = res.data.user;
                setUser(tempUser);
                if (tempUser.customer?.verified === false) {
                    getLastFailedVerification(getLoggedInUserID()).then(verification => {
                        setFailedMessage(verification.data.verification[0].message);
                    });
                }
            });
    }, []);

    const buttonStyle = {
        marginRight: "5px"
    };

    return (
        <div className="d-flex">
            <Container>
                <Row className="vh-100" style={{ marginTop: "25px" }}>
                    <Col md={8} lg={12} xs={12}>
                        <div className="border border-3 border-secondary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">Мій Профіль {
                                        user.customer?.verified &&
                                        <Badge pill bg="primary" style={{ fontSize: "0.5em" }}>
                                            Верифіковано
                                        </Badge>}</h2>

                                    <div className="mb-3">
                                        <strong>Повне ім'я: </strong>{user.firstname + " " + user.lastname} <br></br>
                                        <strong>Пошта: </strong>{user.email} <br></br>
                                        {
                                            user.customer &&
                                            <>
                                                <strong>Номер телефону: </strong>{user.customer.phone} <br></br>
                                                <strong>Криптовалютний гаманець </strong>{user.customer.wallet} <br></br>
                                            </>
                                        }

                                        <Modal show={viewDocuments} onHide={() => setViewDocuments(false)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Мої Документи</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <h4>Паспорт</h4>
                                                <img style={{ width: "100%" }} src={user.customer?.passport} />
                                                <br />
                                                <br />
                                                <h4>Водійське посвідчення</h4>
                                                <img style={{ width: "100%" }} src={user.customer?.licence} />
                                            </Modal.Body>
                                        </Modal>

                                        <div className="mt-3">
                                            <div className="mb-0  text-center">
                                                {
                                                    user.customer === null
                                                        ?
                                                        <Alert variant="secondary">
                                                            <Alert.Heading>Ви не верифікований користувач</Alert.Heading>
                                                            <p>Будь ласка, додайте свої дані, щоб мати змогу повноцінно користуватися застосунком</p>
                                                            <hr />
                                                            <div className="d-flex justify-content-end">
                                                                <Button variant="outline-secondary" onClick={() => setModalVisibility(true)}>
                                                                    Верифікуватися
                                                                </Button>
                                                                <VerificationModal show={modalVisibility} handleClose={() => setModalVisibility(false)} />
                                                            </div>
                                                        </Alert>
                                                        : user.customer?.verified === null
                                                            ?
                                                            <Alert variant="secondary">
                                                                <Alert.Heading>Дані опрацьовуються</Alert.Heading>
                                                                <p>Ваші дані знаходяться в процесі опрацювання, очікуйте на рішення служби підтримки</p>
                                                            </Alert>
                                                            : user.customer?.verified === false
                                                                ?
                                                                <Alert variant="danger">
                                                                    <Alert.Heading>Відхилено</Alert.Heading>
                                                                    <p>Було виявлено певні неточності у ваших даних. Будь ласка, заповніть їх ще раз</p>
                                                                    <p>Причина відмови: <strong>{failedMessage}</strong></p>
                                                                    <div className="d-flex justify-content-end">
                                                                        <Button variant="outline-danger" onClick={() => setModalVisibility(true)}>
                                                                            Верифікуватися
                                                                        </Button>
                                                                        <VerificationModal show={modalVisibility} handleClose={() => setModalVisibility(false)} />
                                                                    </div>
                                                                </Alert>
                                                                :
                                                                <div className="d-flex justify-content-center">
                                                                    <Button style={buttonStyle} variant="secondary" onClick={() => setModalVisibility(true)}><FontAwesomeIcon icon={faEdit} />{'   '}Редагувати</Button>
                                                                    <Button style={buttonStyle} onClick={() => setViewDocuments(true)}><FontAwesomeIcon icon={faEye} />{'   '}Документи</Button>
                                                                    <VerificationModal show={modalVisibility} handleClose={() => setModalVisibility(false)} />
                                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <CarList verified={user.customer?.verified} />
        </div>
    );
}