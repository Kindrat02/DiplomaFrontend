import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { createNewLocation } from "../../../api/LocationApi";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

// import "../../../styles/map.css";

const AddLocation = ({ google, show, handleClose, car }) => {

    const [locations, setLocations] = useState([]);
    const [description, setDescription] = useState("")
    const [currentLocation, setCurrentLocation] = useState({ lat: 49.843635, lng: 24.026433 });

    useEffect(() => {

        // replace initialCenter with center and uncomment this part of code
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(saveLocation);
        }

        let location_array = locations;
        setLocations(location_array);
    }, []);

    const saveLocation = (location) => {
        const loc = { lat: location.coords.latitude, lng: location.coords.longitude };
        setCurrentLocation(loc);
    }

    const onMapClick = (mapProps, map, clickEvent) => {
        setLocations(() => [
            {
                lat: clickEvent.latLng.lat(),
                lng: clickEvent.latLng.lng()
            }
        ]);
    };

    const handleSubmit = () => {
        const newLocation = {
            car: car.id,
            description: description,
            coordinates: {
                latitude: locations[0].lat,
                longitude: locations[0].lng
            }
        }
        createNewLocation(newLocation).then(() => {
            handleClose(true);
        });
    }

    return (

        <Modal show={show} onHide={handleClose} fullscreen={true} style={{ width: "80%", height: "80%", top: "10%", left: "10%" }}>
            <Modal.Header closeButton>
                <Modal.Title>Встановіть локацію</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ width: "79%", height: "100%", position: "absolute" }}>
                    <Map
                        google={google}
                        initialCenter={currentLocation}
                        zoom={14}
                        onClick={onMapClick}>
                        {locations.map((marker, idx) => {
                            return (
                                <Marker
                                    key={idx}
                                    onClick={() => setLocations([])}
                                    position={{ lat: marker.lat, lng: marker.lng }} />)
                        })}
                    </Map>
                </div>
            </Modal.Body>

            <Form.Group as={Row} style={{ marginTop: "10px", marginLeft: "5px" }}>
                <Form.Label column sm={2}>
                    Опис
                </Form.Label>
                <Col sm={10}>
                    <Form.Control style={{ width: "75%" }} as="textarea" name="description" placeholder="Додайте опис" onChange={event => setDescription(event.target.value)} required />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm={{ span: 2, offset: 8 }}>
                    <Button variant="success" style={{ marginTop: "8px", marginBottom: "8px", marginLeft: "70px" }} onClick={handleSubmit}><FontAwesomeIcon icon={faFloppyDisk} />{'  '}Зберегти</Button>
                </Col>
            </Form.Group>
        </Modal>

    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(AddLocation);