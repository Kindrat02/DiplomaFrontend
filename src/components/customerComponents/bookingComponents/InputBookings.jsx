import React, { useState, useEffect } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { getIncomingBooking, approveBooking, rejectBooking, finishBooking } from "../../../api/BookingApi";
import { getLoggedInUserID } from "../../../services/UserService";
import { createBooking, returnPledgeToClient, fundPledgeToDriver } from "../../../services/ContractService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX, faSearch } from "@fortawesome/free-solid-svg-icons";
import { getBookingState } from "../../../services/BookingService";
import moment from "moment";

import "../../../styles/alert.css";

export const InputBookings = () => {

    const [temp, setTemp] = useState(0);
    const [bookings, setBookings] = useState([]);
    const [approveConfirmation, setApproveConfirmation] = useState(false);
    const [declineConfirmation, setDeclineConfirmation] = useState(false);

    useEffect(() => {
        getIncomingBooking(getLoggedInUserID()).then(res => {
            setBookings(res.data.bookings);
        });
    }, [temp]);

    const handleDecline = (booking) => {
        console.log(booking);
        if (booking.status === "CONFIRMED") {
            // take fee
            rejectBooking(booking._id);
        } else if (booking.status === "PENDING_DRIVER") {
            rejectBooking(booking._id).then(() => {
                setTemp(temp + 1);
            });
        }
    }

    const handleApprove = (booking) => {
        createBooking(booking).then(() => {
            approveBooking(booking._id).then(() => {
                setTemp(temp + 1);
            });

        });
    }

    const handlePledgeToClient = (booking) => {
        returnPledgeToClient(booking).then(() => {
            finishBooking(booking._id).then(() => {
                setTemp(temp + 1);
            }

            );
        })
    }

    const handlePledgeToOwner = (booking) => {
        fundPledgeToDriver(booking).then(() => {
            finishBooking(booking._id).then(() => {
                setTemp(temp + 1);
            });
        })
    }

    const buttonStyle = {
        marginRight: "5px"
    };

    return (
        <>
            {approveConfirmation &&
                <div className="alert-overlay">
                    <Alert variant="success" dismissible onClose={() => setApproveConfirmation(false)}>
                        <Alert.Heading>Підтвердіть вашу дію</Alert.Heading>
                        <p>
                            Ви точно намагаєтеся прийняти цю пропозицію?
                        </p>
                        <Button variant="dark" onClick={() => handleApprove(approveConfirmation)}>Підтвердити</Button>
                    </Alert>
                </div>
            }
            {declineConfirmation &&
                <div className="alert-overlay">
                    <Alert variant="danger" dismissible onClose={() => setDeclineConfirmation(false)}>
                        <Alert.Heading>Підтвердіть вашу дію</Alert.Heading>
                        <p>
                            Ви точно намагаєтеся відхилити цю пропозицію?
                        </p>
                        <Button onClick={() => handleDecline(declineConfirmation)} variant="dark">Підтвердити</Button>
                    </Alert>
                </div>}
            <h2>Мої Вхідні Бронювання</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Час Замовлення</th>
                        <th>Час Отримання</th>
                        <th>Час Повернення</th>
                        <th>Ціна</th>
                        <th>Статус</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, idx) =>
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{moment(booking.bookedtime).format('DD/MM/yyyy HH:mm')}</td>
                            <td>{moment(booking.pickuptime).format('DD/MM/yyyy HH:mm')}</td>
                            <td>{moment(booking.returntime).format('DD/MM/yyyy HH:mm')}</td>
                            <td>{booking.cost === 0 ? 0.16 : booking.cost} Eth</td>
                            <td>{getBookingState(booking.status)}</td>
                            <td>
                                <Button style={buttonStyle} href={`/mybookings/${booking._id}`}><FontAwesomeIcon icon={faSearch} />{'     '}Детальніше</Button>
                                {
                                    booking.status === "PENDING_DRIVER" &&
                                    <>
                                        <Button variant="success" style={buttonStyle} onClick={() => setApproveConfirmation(booking)}><FontAwesomeIcon icon={faCheck} />{'     '}Прийняти</Button>
                                        <Button variant="danger" style={buttonStyle} onClick={() => setDeclineConfirmation(booking)}><FontAwesomeIcon icon={faX} />{'     '}Відхилити</Button>
                                    </>
                                }
                                {
                                    booking.status === "CONFIRMED" &&
                                    <>
                                        <Button variant="danger" style={buttonStyle} onClick={() => handleDecline(booking)}><FontAwesomeIcon icon={faX} />{'     '}Скасувати</Button>
                                    </>
                                }
                                {
                                    booking.status === "RETURNED" &&
                                    <>
                                        <Button variant="success" style={buttonStyle} onClick={() => handlePledgeToClient(booking)}><FontAwesomeIcon icon={faCheck} />Повернути заставу</Button>
                                        <Button variant="danger" style={buttonStyle} onClick={() => handlePledgeToOwner(booking)}><FontAwesomeIcon icon={faX} />Стягнути заставу</Button>
                                    </>
                                }

                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}