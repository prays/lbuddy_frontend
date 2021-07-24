import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ComboBox from '../../components/ComboBox/ComboBox';
import Card from 'react-bootstrap/Card';
import { WEBSITE_LINK } from '../../constants.js';
import './MyCourses.css';

const getTimeDiffInDays = (time) => {
    const currentTime = new Date();
    return Math.round((currentTime.getTime() - Date.parse(time)) / (1000 * 3600 * 24));
}

const daysToMonth = (time) => {
    return time / 30;
}

const handleTime = (userTime) => {
    if (getTimeDiffInDays(userTime) > 30) {
        return Math.round(daysToMonth(getTimeDiffInDays(userTime)));
    } else {
        return getTimeDiffInDays(userTime);
    }
}

const MyCourses = ({ user, readCourses, loadUser }) => {
    const [courses, setCourses] = useState(user.courses);
    const [coursesArray, setCoursesArray] = useState([]);
    const [isAddingCourse, setIsAddingCourse] = useState(false);
    const [courseOption, setCourseOption] = useState('');
    const [error, setError] = useState('');

    const handleShowAddCourse = () => {
        setIsAddingCourse(!isAddingCourse);
        setError('');
    }
    
    const handleComboBox = (event) => {
        setCourseOption(event?.target?.textContent);
    }
    
    const handleAddCourse = async () => {
        if (courseOption) {
            try {
                const data = await fetch(`${WEBSITE_LINK}/set-courses`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: user.email,
                        course: courseOption
                    })
                });
                const myCourses = await data.json();
                await setCourses(myCourses);
                loadUser(Object.assign({}, user, { courses: myCourses }));
            } catch (error) {
                console.log(error);
            }
        } else {
            setError('Please choose a course.');
        }
    }
    
    useEffect(() => {
        let anArray = courses.map((item, index) => {
            let courseTitle = '';
            let courseLink = '';
            let joined = item.joined;
            readCourses.forEach((data, id) => {
                if ((item.course) === data.title) {
                    courseTitle = data.title;
                    courseLink = data.link;
                }
            })
            return [courseTitle, courseLink, joined];
        })
        setCoursesArray(anArray);
    }, [courses]);

    return (
        <Container fluid="true">
            <Row className="MyCourses">
                <Col>
                    <h2>{`Hello, ${user.first_name}.`}</h2>
                    <h5>{`You currently have ${coursesArray.length} courses.`}</h5>
                </Col>
                <Col>
                    <Button style={{marginBottom: '10px'}} onClick={handleShowAddCourse}>Add Course</Button>
                </Col>
                {isAddingCourse
                ?  (<Col>
                        <div style={{marginTop: '10px', display: 'flex', flexDirection: 'row'}}>
                            <ComboBox required readCourses={readCourses} handleComboBox={handleComboBox} />
                            <Button
                            variant="success"
                            onClick={() => handleAddCourse()}
                            style={{marginLeft: '10px'}}
                            >Submit</Button>
                        </div>
                        <p style={{color: '#f00'}}>{error}</p>
                    </Col>)
                :   (<></>)
                }
                <CardListMyCourses recommendations={coursesArray} />
            </Row>
        </Container>
    );
}

const CardListMyCourses = ({ recommendations }) => {
    return (
        <div style={{ overflowY: 'scroll', borderRadius: '25px', border: '0.5px solid black', height: '500px' }}>
            <div className="cardDeck">
                {
                    recommendations.map((user, id) => {
                        return (
                            <Card className="card" key={id} border="primary">
                                <Card.Header style={{fontWeight: 'bold'}}>PaCE@NTU</Card.Header>
                                <Card.Body>
                                    <Card.Title>{user[0]}</Card.Title>
                                </Card.Body>
                                <p 
                                style={{ color: 'grey', marginLeft: '15px', fontStyle: 'italic'}}>
                                    {`${handleTime(user[2])} ${getTimeDiffInDays(user[2]) > 30 ? 'month(s)' : 'day(s)'} ago`}
                                </p>
                                <Button onClick={() => window.open(user[1])} variant="primary">Check it out!</Button>
                            </Card>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default MyCourses;