import React, { useState, useEffect } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllEmployees, deleteEmployeeById } from "../../api/UserApi";
import "../../styles/alert.css";
import { AddEmployee } from "./AddEmployee";

export const ViewAllEmployees = () => {
    const [temp, setTemp] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [deleteAlertVisible, setDeleteAlertVisibility] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        getAllEmployees()
            .then(res => {
                setEmployees(res.data.employees);
            });
    }, [temp]);

    const handleDelete = () => {
        setDeleteAlertVisibility(false);
        deleteEmployeeById(selectedId)
            .then(() => {
                setSuccessAlertVisible(true);
                setTemp(temp + 1);
            });
    }

    return (
        <>
            <div className="alert-overlay">
                <Alert variant="success" dismissible show={successAlertVisible} onClose={() => setSuccessAlertVisible(false)}>
                    <Alert.Heading>Видалення користувача</Alert.Heading>
                    <p>Видалення користувача було успішним</p>
                </Alert>
                <Alert variant="danger" dismissible show={deleteAlertVisible} onClose={() => setDeleteAlertVisibility(false)}>
                    <Alert.Heading>Видалення працівника</Alert.Heading>
                    <hr />
                    <p>Ви справді хочете видалити цього користувача? Ця дія є незворотньою</p>
                    <Button style={{marginLeft: "450px"}} variant="danger" onClick={() => handleDelete()}>Підтвердити</Button>
                </Alert>
            </div>

            <h3>Список працівників служби підримки</h3>
            <Table hover bordered={true}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ім'я</th>
                        <th>Прізвище</th>
                        <th>Пошта</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees && employees.map((el, idx) => {
                            return (
                                <tr key={idx + 1}>
                                    <td>{idx + 1}</td>
                                    <td>{el.firstname}</td>
                                    <td>{el.lastname}</td>
                                    <td>{el.email}</td>
                                    <td><Button variant="danger" onClick={() => { setSelectedId(el._id); setDeleteAlertVisibility(true); }}><FontAwesomeIcon icon={faTrash} />{'   '}Видалити</Button></td>
                                </tr>);
                        })
                    }
                </tbody>
            </Table>
            <Button className="float-end" variant="success" onClick={() => setModalShow(true)}><FontAwesomeIcon icon={faPlus} />{'   '}Додати працівника</Button>

            <AddEmployee show={modalShow} handleAdding={() => setTemp(temp + 1)} handleModalClose={() => setModalShow(false)} reloadList={() => setTemp(temp + 1)} />
        </>
    );
}