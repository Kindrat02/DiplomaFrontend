/* Create car page */
import { useState } from "react";
import { createNewCar } from "../../../api/CarApi";
import { CAR_COLOURS, CAR_BODY_TYPES, CAR_FUEL_TYPES, CAR_SEATS, FILE_UPLOAD_LIMIT, CAR_TRANSMISSION, CAR_GEARBOX } from "../../../Constants";
import { Form, Col, Button, Row, Modal } from "react-bootstrap";
import { getLoggedInUserID } from "../../../services/UserService";

export const AddCar = ({ show, handleClose }) => {

    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [seats, setSeats] = useState("");
    const [bodytype, setBodytype] = useState("");
    const [gearbox, setGearbox] = useState("");
    const [transmission, setTransmission] = useState("");
    const [colour, setColour] = useState("");
    const [year, setYear] = useState(1980);
    const [fueltype, setFueltype] = useState("");

    const [numberplate, setNumberplate] = useState("");
    const [VIN, setVIN] = useState("");
    const [b64photo, setPhoto] = useState("");

    const [costperhour, setCostPerHour] = useState("");
    const [pledge, setPledge] = useState("");

    const handleFile = (event) => {
        let files = event.target.files;
        if (files !== null) {
            if (event.target.files[0].size > FILE_UPLOAD_LIMIT) {
                return;
            }
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (event) => {
                setPhoto(event.target.result);
            }
        }
    }

    const handleChange = (event) => {
        if (event.target.name === "bodytype") {
            setBodytype(event.target.value);
        } else if (event.target.name === "make") {
            setMake(event.target.value);
        } else if (event.target.name === "colour") {
            setColour(event.target.value);
        } else if (event.target.name === "gearbox") {
            setGearbox(event.target.value);
        } else if (event.target.name === "transmission") {
            setTransmission(event.target.value);
        } else if (event.target.name === "numberplate") {
            setNumberplate(event.target.value);
        } else if (event.target.name === "seats") {
            setSeats(+event.target.value);
        } else if (event.target.name === "costperhour") {
            setCostPerHour(+event.target.value);
        } else if (event.target.name === "pledge") {
            setPledge(+event.target.value);
        } else if (event.target.name === "fueltype") {
            setFueltype(event.target.value);
        } else if (event.target.name === "model") {
            setModel(event.target.value);
        } else if (event.target.name === "year") {
            setYear(+event.target.value);
        } else if (event.target.name === "VIN") {
            setVIN(event.target.value);
        }
    }

    const generateRange = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => i + start).reverse();
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const newCar = {
            make: make.trim(),
            model: model.trim(),
            bodytype: bodytype,
            seats: seats,
            gearbox: gearbox,
            transmission: transmission,
            fueltype: fueltype,
            year: year,
            colour: colour,
            numberplate: numberplate.trim(),
            VIN: VIN,
            costperhour: costperhour,
            pledge: pledge,
            b64photo: b64photo,
            owner: getLoggedInUserID()
        };

        createNewCar(newCar).then(() => {
            handleClose();
            window.location.reload(false);
        });
    }

    return (
        <Modal show={show} onHide={() => handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Додавання авто</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate>
                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>
                            Марка
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="make" placeholder="Введіть марку" onChange={handleChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Марка
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="model" placeholder="Введіть модель" onChange={handleChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Кузов</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" defaultValue={"DEFAULT"} name="bodytype" onChange={handleChange} required>
                                <option disabled value="DEFAULT">Оберіть тип кузова</option>
                                {
                                    CAR_BODY_TYPES.map((option, index) =>
                                        <option key={index} value={option}>{option}</option>
                                    )
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Коробка передач
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" name="gearbox" defaultValue={"DEFAULT"} onChange={handleChange} required>
                                <option value="DEFAULT" disabled>Виберіть тип коробки передач</option>
                                {
                                    CAR_GEARBOX.map((option, index) =>
                                        <option key={index} value={option}>{option}</option>
                                    )
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Привід
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" name="transmission" defaultValue={"DEFAULT"} onChange={handleChange} required>
                                <option value="DEFAULT" disabled>Виберіть тип приводу</option>
                                {
                                    CAR_TRANSMISSION.map((option, index) =>
                                        <option key={index} value={option}>{option}</option>
                                    )
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Паливо
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" name="fueltype" defaultValue={"DEFAULT"} onChange={handleChange} required>
                                <option value="DEFAULT" disabled>Виберіть тип палива</option>
                                {
                                    CAR_FUEL_TYPES.map((option, index) =>
                                        <option key={index} value={option}>{option}</option>
                                    )
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Колір
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" name="colour" defaultValue={"DEFAULT"} onChange={handleChange} required>
                                <option disabled value="DEFAULT">Оберіть колір</option>
                                {
                                    CAR_COLOURS.map((option, index) =>
                                        <option key={index} value={option}>{option}</option>
                                    )
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Рік виробництва
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" name="year" defaultValue={"DEFAULT"} onChange={handleChange} required>
                                <option disabled value="DEFAULT">Оберіть рік виробництва</option>
                                {
                                    generateRange(1980, 2023).map((option, index) =>
                                        <option key={index} value={option}>{option}</option>
                                    )
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Кількість сидінь
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" name="seats" defaultValue={"DEFAULT"} onChange={handleChange} required>
                                <option value="DEFAULT" disabled>Виберіть кількість сидінь</option>
                                {
                                    CAR_SEATS.map((option, index) =>
                                        <option key={index} value={option}>{option}</option>
                                    )
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalNumberPlate">
                        <Form.Label column sm={2}>
                            Номерний знак
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="numberplate" placeholder="Введіть номерний знак" onChange={handleChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>
                            VIN
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="VIN" placeholder="Введіть VIN код" onChange={handleChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Вартість за годину
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="costperhour" type="number" placeholder="Вартість за годину" step={0.05} onChange={handleChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Застава
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="pledge" type="number" placeholder="Введіть ціну застави" step={0.05} onChange={handleChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                id="custom-file"
                                label="Car Image (4MB макс)"
                                type="file"
                                name="b64photo"
                                accept="image/*"
                                onChange={handleFile}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button onClick={handleSubmit}>Додати</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
