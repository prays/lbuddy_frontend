import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import './Guide.css';

const Guide = () => {
    const history = useHistory();

    const handleContinue = () => {
        history.push('/survey')
    }

    return (
        <Container fluid="true" >
            <Row className="guide">
                <Col 
                style={{fontSize:"1.2em"}}
                >
                    <h2>{`Guide to Work Challenge Statement`}</h2>
                    <p>
                        {`A challenge statement should preferably be around 200 words. 
                        When crafting a challenge statement, employee/learner should 
                        aim to clearly include the following:`}
                    </p>
                    <ul>
                        <li>
                            <p>
                                {`Skill/Knowledge – a specific skill/knowledge should 
                                be included to be clear on what the learner aims to achieve 
                                (work objective). The skill/knowledge should be one that is 
                                currently missing from the learners repertoire `}
                            </p>
                        </li>
                        <li>
                            <p>
                                {`Timeframe – a deadline for the work objective to be achieved 
                                should be clearly indicated, in order to provide focus and motivation`}
                            </p>
                        </li>
                        <li>
                            <p>
                                {`End goal/Target Goal –the end goal of why this skill/knowledge 
                                is chosen should be indicated`}
                            </p>
                        </li>
                    </ul>
                    <p>
                        {`An example of a challenge statement in the context of co-skilling goes 
                        as follows: “I would like to learn Python programming in next three months 
                        so as to be able to develop an application for enhancing the process of 
                        productivity in my department.”`}
                    </p>
                </Col>
                <Col style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button onClick={handleContinue} size="lg" variant="primary">Continue</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Guide;