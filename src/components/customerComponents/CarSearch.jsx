import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getAllCars } from "../../api/CarApi";
import { CAR_COLOURS, CAR_BODY_TYPES, CAR_SEATS, CAR_FUEL_TYPES } from "../../Constants";

export const CarSearch = () => {

    const [cars, setCars] = useState([]);
    const [make, setMake] = useState("");
    const [seats, setSeats] = useState('Any');
    const [fueltype, setFuelType] = useState('Any');
    const [colour, setColour] = useState('Any');
    const [location, setLocation] = useState('Any');
    const [bodytype, setBodytype] = useState('Any');

    useEffect(() => {
        getAllCars().then(res => {
            setCars(cars);
        })
    }, []);

    const handleChange = () => {
        
    }

    const handleSubmitFilter = () => {

    }

    return (
        <>
            <Container>
                <Row>
                    <Col xs={3}>
                        <Form onSubmit={handleSubmitFilter} id="filter_form" >
                            <Form.Group controlId="formHorizontalFirstName">
                                <Form.Label >
                                    Марка
                                </Form.Label>
                                <Form.Control name="make" type="text" placeholder="Make" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Кількість місць</Form.Label>
                                <Form.Control name="seats" as="select" onChange={handleChange}>
                                    <option>Any</option>
                                    {CAR_SEATS.map(carSeat =>
                                        <>
                                            <option>{carSeat}</option>
                                        </>
                                    )}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Тип палива</Form.Label>
                                <Form.Control name="fueltype" as="select" onChange={handleChange}>
                                    <option>Any</option>
                                    {CAR_FUEL_TYPES.map(carFuel =>
                                        <>
                                            <option>{carFuel}</option>
                                        </>
                                    )}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Кузов</Form.Label>
                                <Form.Control name="bodytype" as="select" onChange={handleChange}>
                                    <option>Any</option>
                                    {CAR_BODY_TYPES.map(carBodyType =>
                                        <>
                                            <option>{carBodyType}</option>
                                        </>
                                    )}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Колір</Form.Label>
                                <Form.Control name="colour" as="select" onChange={handleChange}>
                                    <option>Any</option>
                                    {CAR_COLOURS.map(carColour =>
                                        <>
                                            <option>{carColour}</option>
                                        </>
                                    )}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col >
                                    <Button type="submit">Пошук</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={9}></Col>
                </Row>
            </Container>
        </>);
}