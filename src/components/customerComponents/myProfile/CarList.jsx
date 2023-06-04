/* Cars component in landing page */
import React, { useEffect, useState } from "react";
import { getUserCars } from "../../../api/CarApi";
import { Container, Row, Col, Button, Card, Alert, Modal, ModalBody } from "react-bootstrap";
import "../../../styles/cars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump, faCarSide, faSearch, faEdit, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { AddCar } from "./AddCar";
import { useNavigate } from "react-router-dom";
import { getLoggedInUserID } from "../../../services/UserService";
import AddLocation from "./AddLocation";

export const CarList = ({ verified }) => {

    const [cars, setCars] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getUserCars(getLoggedInUserID()).then(res => {
            setCars(res.data.cars);
        });
    }, []);

    return (
        <>
            <Container>
                <Row className="vh-100 " style={{ marginTop: "25px" }}>
                    <Col md={8} lg={12} xs={12}>
                        <div className="border border-3 border-secondary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">Мої Машини</h2>
                                    <div className="mb-3">
                                        <div className="mt-3">
                                            <div className="mb-0 text-center">
                                                {!verified ?
                                                    <Alert variant="secondary">
                                                        <Alert.Heading>Ви не верифікований користувач</Alert.Heading>
                                                        <p>Будь ласка, верифікуйтеся, щоб мати змогу додати авто</p>
                                                    </Alert>
                                                    :
                                                    <>
                                                        <Container fluid>
                                                            <Row>
                                                                {cars.length === 0 ? "У вас ще немає машин" : cars.map(car => <CarDescriptionComponent car={car} />)}
                                                            </Row>
                                                        </Container>
                                                        <AddCar show={showModal} handleClose={() => setShowModal(false)} />
                                                        <Button variant="secondary" onClick={() => setShowModal(true)}>Додати авто</Button>
                                                    </>
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
        </>
    );
}

const CarDescriptionComponent = ({ car }) => {
    const navigate = useNavigate();
    const [geoModal, setGeoModal] = useState(false);

    return (
        <>
            <Col sm={4}>
                <Card style={{ width: "19rem", marginBottom: "30px" }}>
                    <Card.Img variant="top" src={car.image} style={{ width: "100%" }} />
                    <Card.Body>
                        <Card.Title>{car.make + " " + car.model}</Card.Title>
                        <Card.Text><FontAwesomeIcon icon={faGasPump} /> {car.fueltype}</Card.Text>
                        <Card.Text><FontAwesomeIcon icon={faCarSide} /> {car.bodytype}</Card.Text>
                        <Button variant="dark" onClick={() => navigate("/cars/" + car.id)}><FontAwesomeIcon icon={faSearch} />{' '} Детальніше</Button>
                        <Button variant="secondary" className="float-end"><FontAwesomeIcon icon={faEdit} />{' '}Редагувати</Button>
                        <br />
                        <Button style={{ marginTop: "10px", marginLeft: "20px" }} onClick={() => setGeoModal(true)}><FontAwesomeIcon icon={faLocationDot} />Локація</Button>
                    </Card.Body>
                </Card>
            </Col>
            <AddLocation car={car} show={geoModal} handleClose={() => setGeoModal(false)} />
        </>

    );
}
