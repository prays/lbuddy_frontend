import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Diagram from '../../components/Diagram/Diagram';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div>
            <Row>
                <Col className="start">
                    <h1>Start your journey with us!</h1>
                    <h5>Join us @LearningBuddy</h5>
                    <Link to="/sign-up"><Button variant="outline-primary">Join</Button></Link>{' '}
                </Col>
            </Row>
            <Diagram />   
        </div>
    );
}

export default Home;