import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CardList from '../CardList/CardList';
import Modal from 'react-bootstrap/Modal';
import './Recommendation.css';
import { Link } from 'react-router-dom';
import loading from './loading.gif';
import SendIcon from '@material-ui/icons/Send';
import { WEBSITE_LINK } from '../../constants';

const Recommendation = ({ readCourses, survey, user }) => {
    const [text, setText] = useState(`I'm currently working as ${survey.q1 || '[occupation]'}. My specialties are ${survey.q2[0] || '[skill1]'}, ${survey.q2[1] || '[skill2]'}, and ${survey.q2[2] || '[skill3]'}. I have some difficulties in ...`);
    const [recommendations, setRecommendations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const onTextChange = (event) => {
        const fixInput = (input) => {
            input = input.replace(/\n/g, " ");
            return input;
        }
        setText(fixInput(event.target.value));
    }

    const onSubmitWCS = () => {
        handleShowModal();

        fetch(`${WEBSITE_LINK}/rec`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                statement: text
            })
        })
        .then(response => response.json())
        .then(getData => {
            const listCourses = Object.entries(getData)
            let courses = [];
            for (const item of listCourses) {
                for (const user of readCourses) {
                    if (item[0] === user.title) {
                        courses.push([user, item[1]]);
                    }
                }
            }
            setRecommendations(courses);
            handleCloseModal();
        })
        .catch((error) => {
            console.log(error);
            handleCloseModal();
        }); 
    }
    
    const Example = () => {
      
        return (
          <>
            <Modal
                className="meow"
                show={showModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                centered
                dialogClassName="bodyModal cat"
            >
                <Modal.Body className="blue cat center">
                    <Container className="center">
                        <img src={loading} alt="" height="140px" width="auto"/>
                        <h3 style={{color: "white"}}>Getting recommendations...</h3>
                        <p style={{color: "white"}}>Please wait while we're processing. This usually takes 15 seconds</p>
                    </Container>
                </Modal.Body>
            </Modal>
          </>
        );
    }
    
    return (
        <Container fluid="true">
            {/* <Loading show={showModal} handleShow={handleShow} handleClose={handleClose} /> */}
            <Row className="recommendation">
                <Col className="">
                    <h2 style={{display: 'grid', justifySelf: 'start'}}>Enter your Work Challenge Statement</h2>
                    {/* <Link to="/guide">
                        <Button
                        variant="primary" 
                        style={{marginBottom: '10px', display: 'grid', justifySelf: 'end'}}>
                            Guide
                        </Button>
                    </Link> */}
                </Col>
                <Col>
                    <Form>
                        <Form.Group >
                            <Form.Control value={text} onChange={onTextChange} as="textarea" rows={10} />
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <Button style={{ display: 'flex', alignItems: 'stretch' }}onClick={onSubmitWCS} variant="primary" size="lg">
                        Submit<SendIcon style={{margin: '5px 0px 5px 10px'}}></SendIcon>
                    </Button>
                </Col>
                {recommendations.length !== 0
                ?   (
                    <div style={{marginTop: '10px'}} className="center">
                        <h2>Results:</h2>
                        <Col className="cardList">
                            <CardList recommendations={recommendations} />
                        </Col>
                        <Col style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '30px'}}>
                            <Link to="/my-courses"><Button size="lg" variant="primary">Continue</Button></Link>
                        </Col> 
                    </div>
                    )
                : (<></>)}
            </Row>
            <Example />
        </Container>
    );
}

export default Recommendation;