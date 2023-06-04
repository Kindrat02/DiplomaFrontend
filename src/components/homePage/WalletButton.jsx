import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { connectWallet, checkWallet, execute } from "../../services/ContractService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import "../../styles/alert.css";


export const WalletButton = () => {

    const [isAlertVisible, setAlertVisibility] = useState(false);
    const [buttonMessage, setButtonMessage] = useState("Гаманець");
    const [connectResult, setConnectResult] = useState(null);

    useEffect(() => {
        checkWallet().then(address => {
            if (address) {
                setButtonMessage(address.substring(0, 7) + "...");
                setConnectResult(true);
            }
        })
    }, []);


    const walletHandler = () => {
        connectWallet().then(address => {
            if (!address) {
                setConnectResult(false);
            } else {
                setConnectResult(true);
                setButtonMessage(address.substring(0, 7) + "...");
            }
            setAlertVisibility(true);
        });
    }

    return (
        <>
            <Button onClick={walletHandler} style={{width: "140px"}} variant="secondary"><FontAwesomeIcon icon={faWallet} />{" " + buttonMessage}</Button>
            <div className="alert-overlay">
                <Alert show={isAlertVisible && !connectResult} onClose={() => setAlertVisibility(false)} key="danger" variant="danger" dismissible>
                    <Alert.Heading>Помилка з'єднання</Alert.Heading>
                    <p>На вашому браузері відсутнє розширення Metamask</p>
                    <hr />
                    <p>Будь ласка, установіть його, щоб мати змогу користуватися цим додатком</p>
                </Alert>
                <Alert show={isAlertVisible && connectResult} onClose={() => setAlertVisibility(false)} key="success" variant="success" dismissible>
                    Гаманець успішно під'єднано
                </Alert>
            </div>
        </>
    );
}