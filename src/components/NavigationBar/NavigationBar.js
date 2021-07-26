import React from 'react';
import './NavigationBar.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Logo from './logo.png';

const NavigationBar = ({ isSignedIn, setIsSignedIn }) => {
    const history = useHistory();
    const location = useLocation();

    const onSignOut = () => {
        setIsSignedIn(false);
        if (location.pathname !== '/') {
            history.push('/');
        } else {
            window.location.reload();
        }
    }
    
    return (
        <Navbar fixed="top" bg="primary" variant="dark">
            <Link to="/">
                <Navbar.Brand>
                    <div className="brand">
                        <img
                            alt="logo"
                            src={Logo}
                            width="auto"
                            height="30 "
                            className="d-inline-block align-top"
                        />{' '}
                        <p className="name">{`LearningBuddy`}</p>
                    </div>
                </Navbar.Brand>
            </Link>
            <Nav className="mr-auto">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/my-courses">My Courses</Link>
                {!isSignedIn
                ? (<Button variant="success" disabled>Recommendation</Button>)
                : (<Link to="/write"><Button variant="success">Recommendation</Button></Link>)}
            </Nav>
            {isSignedIn
            ? (<Button onClick={onSignOut} variant="outline-light">Sign Out</Button>)
            : (<Link to="/sign-in"><Button variant="outline-light">Sign In</Button></Link>)}
        </Navbar>
    );
}

export default NavigationBar;