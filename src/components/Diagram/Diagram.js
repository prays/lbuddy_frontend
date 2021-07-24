import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image from './diagram.png';
import './Diagram.css';

const Diagram = () => {
    return (
        <Row>
            <Col className="diagram">
                <img className="imgDiagram" src={image} alt="diagram" />
            </Col>
        </Row>   
    );
}

export default Diagram;