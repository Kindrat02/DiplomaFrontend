import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getBookingState } from "../../../services/BookingService";
import { getHistoryBooking } from "../../../api/BookingApi";
import { getLoggedInUserID } from "../../../services/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export const BookingHistory = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        getHistoryBooking(getLoggedInUserID()).then(res => {
            setBookings(res.data.bookings);
        });

    }, []);

    const buttonStyle = {
        marginRight: "5px"
    };

    return (
        <>
            <h2>Історія Бронювань</h2>
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
                {
                    bookings.length !== 0
                        ?
                        <tbody>
                            {bookings.map((booking, idx) =>
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{moment(booking.bookedtime).format('DD/MM/yyyy HH:mm')}</td>
                                    <td>{moment(booking.pickuptime).format('DD/MM/yyyy HH:mm')}</td>
                                    <td>{moment(booking.returntime).format('DD/MM/yyyy HH:mm')}</td>
                                    <td>{booking.cost} Eth</td>
                                    <td>{getBookingState(booking.status)}</td>
                                    <td>
                                        <Button style={buttonStyle} href={`/mybookings/${booking._id}`}><FontAwesomeIcon icon={faSearch} />{'     '}Детальніше</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        :
                        <p>Nen</p>
                }

            </Table>
        </>
    );
}