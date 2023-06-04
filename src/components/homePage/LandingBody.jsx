/* landing page body component */
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import '../../styles/landingBody.css';
import { LandingOverview } from "./LandingOverview";
import { FAQ } from "./FAQ";

export const LandingBody = () => {

    const [currentComponent, setCurrentComponent] = useState("Огляд");

    const handleClick = (event) => {
        setCurrentComponent(event.target.innerHTML);
    }

    return (
        <div id="landing-body">
            <Nav id="landing-body-nav" className="justify-content-center">
                <Nav.Item onClick={handleClick} style={(currentComponent === "Огляд") ? { borderBottom: "4px solid white" } : {}}>
                    <Nav.Link>Огляд</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={handleClick} style={(currentComponent === "FAQ") ? { borderBottom: "4px solid white" } : {}}>
                    <Nav.Link>FAQ</Nav.Link>
                </Nav.Item>
            </Nav>
            <RenderCorrectComponents component={currentComponent} />
        </div>
    );
}

const RenderCorrectComponents = (props) => {
    const { component } = props
    switch (component) {
        case "Огляд":
            return (<LandingOverview />);
        case "FAQ":
            return (<FAQ />);
        default:
            return (<LandingOverview />);
    }
}
