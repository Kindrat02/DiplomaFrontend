import { useEffect, useState } from "react"
import { addVerificationResult, getNonVerifiedCustomers } from "../../../api/CustomerApi";
import { Table, Button, Modal, Alert, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX, faEye } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/alert.css";
import { getLoggedInUserID } from "../../../services/UserService";

export const CustomerVerification = () => {

    const [temp, setTemp] = useState(false);
    const [verificatonList, setVerificationList] = useState([]);
    const [approveAlert, setApproveAlert] = useState(false);
    const [declineAlert, setDeclineAlert] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);
    const [customerId, setCustomerId] = useState(null);

    useEffect(() => {
        getNonVerifiedCustomers()
            .then(res => {
                setVerificationList(res.data.users);
            });
    }, [temp]);

    const findImage = (type) => {
        const user = verificatonList?.find((el) => el._id === customerId);
        if (!user) return null;
        return type === "passport" ? user.customer.passport : user.customer.licence;
    }

    const verifyUser = () => {
        const res = {
            customer: customerId,
            employee: getLoggedInUserID(),
            result: true,
            errorMessage: null
        };
        setApproveAlert(false);
        addVerificationResult(res)
            .then(() => {
                alert("Success");
                setTemp(temp + 1);
            });
    }

    const onDecline = () => {
        const res = {
            customer: customerId,
            employee: getLoggedInUserID(),
            result: false,
            errorMessage: errorMessage
        };

        setDeclineAlert(false);
        addVerificationResult(res)
            .then(() => {
                alert("Failure");
                setTemp(temp + 1);
            });
    }

    const buttonStyle = {
        marginRight: "5px"
    };

    return (
        <>
            <h3>Список користувачів у процесі верифікації</h3>
            <div className="alert-overlay">
                <Alert variant="success" dismissible show={approveAlert} onClose={() => setApproveAlert(false)}>
                    <Alert.Heading>Верифікація користувача</Alert.Heading>
                    <hr />
                    <p>Ви справді хочете верифікути цього користувача?</p>
                    <Button style={{ marginLeft: "250px" }} variant="success" onClick={() => verifyUser()}>Підтвердити</Button>
                </Alert>
            </div>

            <Table hover bordered={true}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ім'я</th>
                        <th>Пошта</th>
                        <th>Гаманець</th>
                        <th>Номер телефону</th>
                        <th>Операції</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        verificatonList && verificatonList.map((el, idx) => {
                            return (
                                <tr key={idx + 1}>
                                    <td>{idx + 1}</td>
                                    <td>{el.firstname + " " + el.lastname}</td>
                                    <td>{el.email}</td>
                                    <td>{el.customer.wallet}</td>
                                    <td>{el.customer.phone}</td>
                                    <td><Button style={buttonStyle} onClick={() => { setCustomerId(el._id); setModalVisibility(true) }}><FontAwesomeIcon icon={faEye} />{'   '}Документи</Button>
                                        <div className="float-end">
                                            <Button style={buttonStyle} variant="success" onClick={() => { setCustomerId(el._id); setApproveAlert(true) }}><FontAwesomeIcon icon={faCheck} /></Button>
                                            <Button style={buttonStyle} variant="danger" onClick={() => { setCustomerId(el._id); setDeclineAlert(true) }}><FontAwesomeIcon icon={faX} /></Button>
                                        </div>
                                    </td>
                                </tr>);
                        })
                    }
                </tbody>
            </Table>

            <Modal show={declineAlert} onHide={() => setDeclineAlert(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Відхилення верифікації</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Причина</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Вкажіть причину відмови" onChange={event => setErrorMessage(event.target.value)}/>
                    </Form.Group>
                    <Button className="float-end" variant="danger" onClick={onDecline}>Підтвердити</Button>
                </Modal.Body>
            </Modal>

            <Modal show={modalVisibility} onHide={() => setModalVisibility(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Документи користувача</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Паспорт</h4>
                    <img style={{ width: "100%" }} src={findImage("passport")} />
                    <br />
                    <br />
                    <h4>Водійське посвідчення</h4>
                    <img style={{ width: "100%" }} src={findImage("licence")} />
                    <br/>
                    <br/>
                    <h5>Перевіряти документи <a href="https://opendata.hsc.gov.ua/check-driver-license/">тут</a></h5>
                </Modal.Body>
            </Modal>
        </>
    );
}