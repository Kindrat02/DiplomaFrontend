import { useEffect, useState } from "react"
import { getNonVerifiedCars } from "../../../api/CarApi";
import { Table, Button, Modal, Alert, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX, faEye } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/alert.css";

export const CarVerification = () => {
    const [verificatonList, setVerificationList] = useState([]);
    const [approveAlert, setApproveAlert] = useState(false);
    const [documentModal, setDocumentModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);
    const [carId, setCarId] = useState(null);

    const buttonStyle = {
        marginRight: "5px"
    };

    useEffect(() => {
        getNonVerifiedCars()
            .then(res => {
                setVerificationList(res.data.cars);
            });
    }, []);

    const verifyCar = () => {
        const res = {
            car: carId,
            result: 1,
            errorMessage: errorMessage
        };
        setApproveAlert(false);
        // addVerificationResult(res)
        //     .then(() => {
        //         alert("Success");
        //     });
    }

    const find = () => {
        const image = verificatonList.find((el) => el.id === carId)?.image;
        return image;
    }

    return (
        <>
            <h3>Список авто у процесі верифікації</h3>
            <div className="alert-overlay">
                <Alert variant="light" dismissible show={approveAlert} onClose={() => setApproveAlert(false)}>
                    <Alert.Heading>Верифікація авто</Alert.Heading>
                    <hr />
                    <p>Ви справді хочете верифікути даний автомобіль?</p>
                    <Button style={{ marginLeft: "250px" }} variant="success" onClick={() => verifyCar()}>Підтвердити</Button>
                </Alert>
            </div>

            <Table hover bordered={true}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Назва</th>
                        <th>Кузов</th>
                        <th>Номерний знак</th>
                        <th>Операції</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        verificatonList && verificatonList.map((el, idx) => {
                            return (
                                <tr key={idx + 1}>
                                    <td>{idx + 1}</td>
                                    <td>{el.make + " " + el.model}</td>
                                    <td>{el.bodytype}</td>
                                    <td>{el.numberplate}</td>
                                    <td><Button style={buttonStyle} onClick={() => { setCarId(el.id); setDocumentModal(true) }}><FontAwesomeIcon icon={faEye} />Зображення</Button>
                                        <div className="float-end">
                                            <Button style={buttonStyle} variant="success" onClick={() => { setCarId(el.id); setApproveAlert(true) }}><FontAwesomeIcon icon={faCheck} /></Button>
                                            <Button style={buttonStyle} variant="danger"><FontAwesomeIcon icon={faX} /></Button>
                                        </div>
                                    </td>
                                </tr>);
                        })
                    }
                </tbody>
            </Table>
            <Modal show={documentModal} onHide={() => setDocumentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Верифікаційне фото</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card.Img src={find()} alt="car" />
                </Modal.Body>
            </Modal>
        </>
    );
}