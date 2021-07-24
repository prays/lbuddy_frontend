import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import UserGrid from '../../components/UserGrid/UserGrid';
import './Admin.css';

const Admin = () => {
    return (
        <Container fluid="true">
            <Row className="admin">
                <Col>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Home">
                        <div className="tabContent">
                            <h2>Users</h2>
                            <UserGrid />
                        </div>
                    </Tab>
                    <Tab eventKey="profile" title="Profile">
                        <div className="tabContent">
                            <h1>Hello2</h1>
                        </div>
                    </Tab>
                    <Tab eventKey="contact" title="Contact">
                        <div className="tabContent">
                            <h1>Hello3</h1>
                        </div>
                    </Tab>
                </Tabs>
                </Col>
            </Row>
        </Container>
    );
}

export default Admin;