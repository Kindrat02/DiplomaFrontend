import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Modal } from 'react-bootstrap';
import { getAllCustomers } from "../../api/UserApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export const ViewAllCustomers = () => {

    const [customers, setCustomers] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);

    useEffect(() => {
        getAllCustomers().then(res => {
            setCustomers(res.data.customers);
        })
    }, []);

    return (
        <>
            <Container>
                <h2>Список клієнтів</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{textAlign: "center"}}>Повне ім'я</th>
                            <th style={{textAlign: "center"}}>Пошта</th>
                            <th style={{textAlign: "center"}}>Номер телефону</th>
                            <th style={{textAlign: "center"}}>Криптовалютний гаманець</th>
                            <th style={{textAlign: "center"}}>Операції</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, idx) =>
                            <tr key={idx}>
                                <td>{customer.firstname + " " + customer.lastname}</td>
                                <td>{customer.email}</td>
                                {
                                    customer.customer?.verified
                                        ?
                                        <>
                                            <td>{customer.customer.phone}</td>
                                            <td>{customer.customer.wallet}</td>
                                        </>
                                        :
                                        <>
                                            <td colSpan={3} style={{textAlign: "center"}}>Користувач не верифікований</td>
                                        </>
                                }
                                <td>
                                    {
                                        customer.customer?.verified &&
                                        <>
                                            <Modal show={modalVisibility} onHide={() => setModalVisibility(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Документи користувача</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <h4>Паспорт</h4>
                                                    <img style={{ width: "100%" }} src={customer.customer.passport} />
                                                    <br />
                                                    <br />
                                                    <h4>Водійське посвідчення</h4>
                                                    <img style={{ width: "100%" }} src={customer.customer.licence} />
                                                </Modal.Body>
                                            </Modal>
                                            <Button onClick={() => setModalVisibility(true)}><FontAwesomeIcon icon={faEye} />{'   '}Документи</Button>
                                        </>

                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

