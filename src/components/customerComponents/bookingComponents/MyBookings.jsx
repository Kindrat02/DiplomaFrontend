import React from "react";
import { Container } from "react-bootstrap";
import { InputBookings } from "./InputBookings";
import { OutputBookings } from "./OutputBookings";
import { BookingHistory } from "./BookingHistory";

export const MyBookings = () => {

        return (
            <Container>
                <InputBookings />
                <OutputBookings />
                <BookingHistory/>
            </Container>
        )
    }