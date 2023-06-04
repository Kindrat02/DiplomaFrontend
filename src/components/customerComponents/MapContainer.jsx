import React, { useEffect, useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { getAllLocations, getAddressFromGeocode } from "../../api/LocationApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Card, Button } from "react-bootstrap";

import "../../styles/map.css";

const MapContainer = (props) => {

	const [locations, setLocations] = useState([]);
	const [activeMarker, setActiveMarker] = useState({});
	const [showingInfoWindow, setShowingInfoWindow] = useState(false);
	const [selectedPlace, setSelectedPlace] = useState({});
	const [currentLocation, setCurrentLocation] = useState({lat: 49.843635, lng: 24.026433});

    useEffect(() => {

		// replace initialCenter with center and uncomment this part of code
		// if (navigator.geolocation) {
		// 	navigator.geolocation.getCurrentPosition(saveLocation);
	  	// }

        // obtain all locations
        let location_array = locations;
        // Get all locations from backend
        getAllLocations().then(res => {
            const data = res.data;
            data.forEach(element => {
                getAddressFromGeocode(element.coordinates.latitude, element.coordinates.longitude).
                    then(res => {
                        // Create object with address, latitude and longitude
                        let object = {
                            id: element._id,
                            address: res.data.results[0].formatted_address,
                            description: element.description,
                            lat: element.coordinates.latitude,
                            lng: element.coordinates.longitude,
							image: element.carInfo.image,
                            car: {
								id: element.car,
								name: element.carInfo.make,
								fueltype: element.carInfo.fueltype,
								bodytype: element.carInfo.bodytype
							}
                        };
    
                    if (!location_array.find(el => el.id === object.id)) {
						location_array.push(object);
					}
                })
            });
        });

        setLocations(location_array);
    }, []);

	const saveLocation = (location) => {
		const loc = {lat: location.coords.latitude, lng: location.coords.longitude};
		setCurrentLocation(loc);
  	}

  	const mapOnMarkerClick = (props, marker) => {
		setSelectedPlace(props);
		setActiveMarker(marker);
		setShowingInfoWindow(true);
  	}
    

	const onMapClick = () => {
		setSelectedPlace({});
		setActiveMarker({});
		setShowingInfoWindow(false);
  	}
    
    return (
    	<div className="map-container">
        	<Map google={props.google}
          		initialCenter={currentLocation}
          		zoom={14}
          		onClick={onMapClick}>
          		{locations.map(marker => {
            		return (
              			<Marker
                			title={marker.car.name}
							subtitle={marker.car.bodytype + ", " + marker.car.fueltype}
                			address={marker.address}
                			description={marker.description}
							image={marker.image}
                			carId={marker.car.id}
                			onClick={mapOnMarkerClick}
                			position={{ lat: marker.lat, lng: marker.lng }} />)
          		})}

          		<InfoWindow
            		marker={activeMarker}
            		visible={showingInfoWindow}>
						<Card style={{width: "24rem"}}>
							<Card.Img variant="top" src={selectedPlace.image} />
							<Card.Body>
								<Card.Title>{selectedPlace.title}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">{selectedPlace.subtitle}</Card.Subtitle>
								<Card.Text>{selectedPlace.description}</Card.Text>
								<Card.Text><FontAwesomeIcon icon={faLocationDot} />{" " + selectedPlace.address}</Card.Text>
								<Button href={"/cars/" + selectedPlace.carId} variant="dark">Детальніше</Button>
							</Card.Body>
						</Card>
            		{/* <div id="info-window">
            			<h2>{selectedPlace.title}</h2>
              			<p>{selectedPlace.description}</p>
              			<p><FontAwesomeIcon icon={faLocationDot} />{" " + selectedPlace.address}</p>
              			<a href={"/cars/" + selectedPlace.car}>Детальніше</a>
            		</div> */}
          		</InfoWindow>
    		</Map>
    	</div>
    );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
}) (MapContainer);
