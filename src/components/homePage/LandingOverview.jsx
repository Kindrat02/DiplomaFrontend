/* Overview component in landing page */
import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank, faCar, faPhone, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { isUserEmployee } from "../../services/UserService";
import '../../styles/overview.css';

export const LandingOverview = () => {
    return (
        <section className="section-item">
            <div>
                <h2>Наші послуги</h2>
                <Container fluid style={{ marginTop: '3vh' }}>
                    <Row>
                        <Col>
                            <div className="how-it-works">
                                <h3>Зареєструйся</h3>
                                <p>Це швидко та просто</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="how-it-works">
                                <h3>Забронюй</h3>
                                <p>Знайди найближчий до себе автомобіль {!isUserEmployee() ? <a href="/locations">тут</a> : "тут"}</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="how-it-works">
                                <h3>Оплати</h3>
                                <p>Оплати послугу через криптогаманець. Про безпеку потурбуємся ми</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="how-it-works">
                                <h3>Драйвуй</h3>
                                <p>Насолоджуйся процесом водіння автомобілем</p>
                            </div>
                        </Col>
                    </Row>
                    <div className="benefits-div">
                        <h2>Переваги</h2>
                        <p>
                            DriveFleet - це каршеринговий сервіс, що надає можливість знайти авто для тимчасової оренди
                        </p>
                        <Row>
                            <Col>
                                <div className="benefits-white-cards">
                                    <FontAwesomeIcon icon={faPiggyBank} size="3x" />
                                    <h3>Реєстрація безплатна</h3>
                                    <p>Приєднавшись, ви нічого не втрачаєте. 100% Безкоштовно!</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="benefits-white-cards">
                                    <FontAwesomeIcon icon={faMoneyBill} size="3x" />
                                    <h3>Без членських внесків</h3>
                                    <p>Ви платити тільки власнику за оренду його авто</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="benefits-white-cards">
                                    <FontAwesomeIcon icon={faCar} size="3x" />
                                    <h3>Дешевше ніж володіння власним авто</h3>
                                    <p>Користуйся авто тільки тоді, коли воно справді потрібне</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="benefits-white-cards">
                                    <FontAwesomeIcon icon={faPhone} size="3x" />
                                    <h3>Надійний сервіс</h3>
                                    <p>Усі орендодавці та машини пройшли перевірку</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row></Row>
                </Container>
                {!isUserEmployee() &&
                    <div className="find-nearest-car-div">
                        <h2>Знайдіть найближчий до вас автомобіль</h2>
                        <p>Наші автомобілі представлені по всій Україні. Мабуть, біля вас є такий</p>
                        <div>
                            <Button href="/locations">Перевірте локації</Button>
                        </div>
                    </div>
                }
            </div>
        </section>
    );
}