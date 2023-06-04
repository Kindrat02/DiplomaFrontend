import React, { useState, useEffect } from "react";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { getOutcomingBooking, payBooking, rejectBooking, returnBooking } from "../../../api/BookingApi";
import { getLoggedInUserID } from "../../../services/UserService";
import { getBookingState } from "../../../services/BookingService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX, faSearch, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { payForService } from "../../../services/ContractService";

export const OutputBookings = () => {

    const [temp, setTemp] = useState(0);
    const [bookings, setBookings] = useState([]);
    const [currentBooking, setCurrentBooking] = useState(null);

    useEffect(() => {
        getOutcomingBooking(getLoggedInUserID()).then(res => {
            setBookings(res.data.bookings);
        });
    }, [temp]);

    const handlePayment = (booking) => {
        payForService(booking).then(() => {
            payBooking(booking._id).then(() => {
                setTemp(temp + 1);
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleDecline = (booking) => {
        if (booking.status === "CONFIRMED") {
            // take fee
            rejectBooking(booking._id);
        } else if (booking.status === "PENDING_DRIVER") {
            rejectBooking(booking._id);
        }
        window.location.reload(false);
    }

    const handleCarReturn = (booking) => {
        returnBooking(booking._id).then(() => {
            setTemp(temp + 1);
        });
    }

    const buttonStyle = {
        marginRight: "5px"
    };

    return (
        <>
            <h2>Мої Вихідні Бронювання</h2>
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
                                        <Button variant="danger" style={buttonStyle} onClick={() => handleDecline(booking)}><FontAwesomeIcon icon={faX} />{'     '}Скасувати</Button>
                                    </>
                                }
                                {
                                    booking.status === "CONFIRMED" &&
                                    <>
                                        <Button variant="success" style={buttonStyle} onClick={() => handlePayment(booking)}><FontAwesomeIcon icon={faCheck} />{'     '}Оплатити</Button>
                                        <Button variant="danger" style={buttonStyle} onClick={() => handleDecline(booking)}><FontAwesomeIcon icon={faX} />{'     '}Скасувати</Button>
                                    </>
                                }
                                {
                                    booking.status === "IN_PROGRESS" &&
                                    <>
                                        <Button variant="success" style={buttonStyle} onClick={() => handleCarReturn(booking)}><FontAwesomeIcon icon={faArrowLeft} />{'     '}Повернути авто</Button>
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