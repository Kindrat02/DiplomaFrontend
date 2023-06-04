/* landing page component */
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/landing.css';
import { LandingBody } from './LandingBody';
import { isUserLoggedIn, isUserEmployee, isUserAdmin, } from '../../services/UserService';

export const LandingBackground = () => {
    const isLoggedIn = isUserLoggedIn();
    const isEmployee = isUserEmployee();
    const isAdmin = isUserAdmin();    
        
    return (
        <>
            <Container id="landing-page" fluid>
                <div id="catchphrase">
                    <h1>DriveFleet</h1>
                    <h4>Відчуйте свободу оренди автомобіля завдяки економіці спільного використання!</h4>

                    {(isLoggedIn && !isEmployee) &&
                        <Link to="/dashboard">
                            <Button variant="warning" style={{ fontSize: '2vh' }}>Знайти машину</Button>
                        </Link>                            
                    }
                    {(isLoggedIn && isEmployee) &&
                        <Link to={isAdmin ? "/admin/profile" : "/staff/profile"}>
                            <Button variant="warning" style={{ fontSize: '2vh' }}>Керувати системою</Button>
                        </Link>
                    }
                    {!isLoggedIn &&
                        <Link to="/signup">
                            <Button variant="warning" style={{ fontSize: '2vh' }}>Зареєструватися</Button>
                        </Link>
                    }
                </div>
            </Container>
            <Container id="landing-main" fluid>
                <LandingBody />
            </Container>
        </>
    );
}