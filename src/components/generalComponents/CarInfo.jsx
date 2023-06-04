import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Alert, Container, Card, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getLoggedInUserID, isUserEmployee } from "../../services/UserService";
import { checkCarAvailability, getCar } from "../../api/CarApi";
import { createBooking } from "../../api/BookingApi";
import moment from "moment";

export const CarInfo = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [failedMessage, setFailedMessage] = useState(null);
    const [pickupDate, setPickupDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [carAvailable, setCarAvailability] = useState(false);
    const [car, setCar] = useState({});

    useEffect(() => {
        getCar(id).then(res => {
            setCar(res.data.car);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        checkCarAvailability({
            carId: car.id,
            pickupDate: pickupDate,
            returnDate: returnDate
        }).then(res => {
            setCarAvailability(res.data.carAvailability);
        });
    }

    const handleChange = (event) => {
        if (event.target.name === "pickupTime") {
            setPickupDate(event.target.value);
        } else if (event.target.name === "returnTime") {
            setReturnDate(event.target.value);
        }
    }

    const submitBooking = () => {
        const booking = {
            user: getLoggedInUserID(),
            car: id,
            pickupTime: pickupDate,
            returnTime: returnDate
        };
        createBooking(booking).then(() => {
            navigate("/mybookings");
        });
    }

    const today = moment().format('YYYY-MM-DDTHH:mm');

    return (
        <>
            <Container>
                <Row className="vh-100 d-flex justify-content-center" style={{ marginTop: "25px" }}>
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-secondary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">{car.make}{' '}{car.model}
                                        {
                                            car.verified &&
                                            <Badge pill bg="primary" style={{ fontSize: "0.5em" }}>
                                                Верифіковано
                                            </Badge>
                                        }
                                    </h2>
                                    <Card.Img variant="top" src={car.image} />
                                    <div className="mb-1">
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicBody">
                                                <Form.Label className="text-center">
                                                    <strong>Кузов:</strong>
                                                </Form.Label>
                                                {' '}
                                                <Form.Label className="text-center">
                                                    {car.bodytype}
                                                </Form.Label>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicGearbox">
                                                <Form.Label className="text-center">
                                                    <strong>Коробка:</strong>
                                                </Form.Label>
                                                {' '}
                                                <Form.Label className="text-center">
                                                    {car.gearbox}
                                                </Form.Label>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicTransmission">
                                                <Form.Label className="text-center">
                                                    <strong>Привід:</strong>
                                                </Form.Label>
                                                {' '}
                                                <Form.Label className="text-center">
                                                    {car.gearbox}
                                                </Form.Label>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicFuel">
                                                <Form.Label className="text-center">
                                                    <strong>Паливо:</strong>
                                                </Form.Label>
                                                {' '}
                                                <Form.Label className="text-center">
                                                    {car.fueltype}
                                                </Form.Label>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicYear">
                                                <Form.Label className="text-center">
                                                    <strong>Рік:</strong>
                                                </Form.Label>
                                                {' '}
                                                <Form.Label className="text-center">
                                                    {car.year}
                                                </Form.Label>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicColour">
                                                <Form.Label className="text-center">
                                                    <strong>Колір:</strong>
                                                </Form.Label>
                                                {' '}
                                                <Form.Label className="text-center">
                                                    {car.colour}
                                                </Form.Label>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicSeats">
                                                <Form.Label className="text-center">
                                                    <strong>Сидінь:</strong>
                                                </Form.Label>
                                                {' '}
                                                <Form.Label className="text-center">
                                                    {car.seats}
                                                </Form.Label>
                                            </Form.Group>

                                            {
                                                car.owner === getLoggedInUserID()
                                                    ?
                                                    car.verified === false
                                                        ?
                                                        <></>
                                                        :
                                                        car.verified === null
                                                            ?
                                                            <Alert className="text-center" variant="secondary">
                                                                <Alert.Heading>Дані опрацьовуються</Alert.Heading>
                                                                <p>Ваші дані знаходяться в процесі опрацювання, очікуйте на рішення служби підтримки</p>
                                                            </Alert>
                                                            :
                                                            <>
                                                                <Alert variant="danger">
                                                                    <Alert.Heading>Відхилено</Alert.Heading>
                                                                    <p>Було виявлено певні неточності у ваших даних. Будь ласка, заповніть їх ще раз</p>
                                                                    <p>Причина відмови: <strong>{failedMessage}</strong></p>
                                                                    <div className="d-flex justify-content-end">
                                                                        <Button variant="outline-danger">
                                                                            Верифікуватися
                                                                        </Button>
                                                                    </div>
                                                                </Alert>
                                                            </>
                                                    :
                                                    <></>
                                            }
                                            {
                                                car.owner !== getLoggedInUserID() && car.verified === true
                                                    ?
                                                    <div className="d-grid border border-3">
                                                        <Form.Group as={Row} controlId="formHorizontalFirstName">
                                                            <Form.Label column sm={6}>Дата Отримання</Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control name="pickupTime"
                                                                    min={today}
                                                                    type="datetime-local" onChange={handleChange} required />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formHorizontalLastName">
                                                            <Form.Label column sm={6}>Дата Повернення</Form.Label>
                                                            <Col sm={6}>
                                                                <Form.Control min={today}
                                                                    name="returnTime"
                                                                    type="datetime-local"
                                                                    onChange={handleChange} required />
                                                            </Col>
                                                        </Form.Group>

                                                        <Button variant="secondary" style={{ width: "80%", margin: "10px auto" }} type="submit">Перевірити наявність</Button>

                                                        {carAvailable && (!isUserEmployee()) && <Button style={{ width: "80%", margin: "10px auto" }} onClick={() => submitBooking()}>Забронювати</Button>}
                                                    </div>
                                                    :
                                                    <></>
                                            }
                                        </Form>
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