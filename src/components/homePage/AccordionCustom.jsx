import React from "react";
import { Accordion, Card, ToggleButton, useAccordionButton } from "react-bootstrap";

export const AccordionCustom = (props) => {
    // FAQ render element
    const { eventKey, question, answer } = props;
    return (
        <Card style={{marginBottom: "3vh"}}>
            <Card.Header>
                <CustomToggle eventKey={eventKey}>
                    {question}
                </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body style={{marginLeft: "2vh"}}>{answer}</Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {});
  
    return (
        <ToggleButton
            onClick={decoratedOnClick}
            variant="link">
            {children}
        </ToggleButton>
    );
  }