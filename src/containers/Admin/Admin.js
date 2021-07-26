import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import UserGrid from '../../components/UserGrid/UserGrid';
import Profile from '../../components/Profile/Profile';
import { WEBSITE_LINK } from '../../constants.js';
import './Admin.css';

const Admin = () => {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
    const fetchData = async () => {
        try {
        const data = await fetch(`${WEBSITE_LINK}/get-particular`);
        const particular = await data.json();
        const newParticular = particular.map((item, id) => {
            const idObject = { id: id }
            const newItem = JSON.parse(JSON.stringify(item));
            newItem.joined = new Date(newItem.joined).toUTCString();
            return Object.assign({}, newItem, idObject);
        })
        await setUsers(newParticular);
        } catch (error) {
        console.log(error);
        }
    }
    fetchData();
    }, [])

    return (
        <Container fluid="true">
            <Row className="admin">
                <Col>
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Home">
                        <div className="tabContent">
                            <h2>Users</h2>
                            <UserGrid users={users} />
                        </div>
                    </Tab>
                    <Tab eventKey="profile" title="Profile">
                        <div className="tabContent">
                            <Profile users={users} />
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