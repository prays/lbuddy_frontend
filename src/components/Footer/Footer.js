import React from 'react';
import './Footer.css';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../NavigationBar/logo.png';

const Footer = () => {
    return (
        <Navbar fixed="bottom"  className="footer" bg="primary" variant="dark">
            <Navbar.Brand className="logoFooter" href="/">
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
                <Nav style={{display: 'flex', justifyContent: 'center'}}>
                    <p style={{marginLeft: '20px'}} className="nameFooter">{`Lorem`}</p>
                </Nav>
            </Navbar.Brand>
        </Navbar>
    );
}

export default Footer;