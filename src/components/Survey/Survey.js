import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import './Survey.css';

const useCheckboxStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
}));

const Survey = ({setSurvey}) => {
    const [quality, setQuality] = useState('');
    const [q1, setQ1] = useState('');
    const [q2A, setQ2A] = useState('');
    const [q2B, setQ2B] = useState('');
    const [q2C, setQ2C] = useState('');
    const [answer, setAnswer] = useState('');
    const [checkbox, setCheckbox] = useState({
        workshops: false,
        certifications: false,
        shortCourses: false
    });
    const classes = useCheckboxStyles();

    useEffect(() => {
        const survey = {
            q1: q1,
            q2: [q2A, q2B, q2C]
        }
        setSurvey(survey);
        console.log(survey);
    }, [q1, q2A, q2B, q2C]);

    const handleQ1Change = (event) => {
        setQ1(event.target.value)
    };

    const handleQ2AChange = (event) => {
        setQ2A(event.target.value)
    };

    const handleQ2BChange = (event) => {
        setQ2B(event.target.value)
    };

    const handleQ2CChange = (event) => {
        setQ2C(event.target.value)
    };

    const handleCheckboxChange = (event) => {
        setCheckbox({ ...checkbox, [event.target.name]: event.target.checked });
    };

    const handleQualityChange = (event) => {
        setQuality(event.target.value);
    };

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    };

    const { workshops, certifications, shortCourses } = checkbox;

    return (
        <Container className="survey" fluid="true">
            <Row>
                <Col>
                    <h1>Welcome!</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>We would like to invite you for a quick survey.</h3>
                    <p>Please fill out this survey to help you for the work challenge statement</p>
                </Col>
            </Row>
            <div style={{marginTop: '30px'}}>
                <Row>
                    <Col>
                        <h4>{'Q1 What do you do?'}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextField onChange={handleQ1Change} fullWidth className="answer" id="standard-basic" label="Job" />
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
            <div style={{marginTop: '30px'}}>
                <Row>
                    <Col>
                        <h4>{'Q2 List three key performance indicators for your job'}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextField onChange={handleQ2AChange} fullWidth className="answer" id="standard-basic" label="1" />
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextField onChange={handleQ2BChange} fullWidth className="answer" id="standard-basic" label="2" />
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextField onChange={handleQ2CChange} fullWidth className="answer" id="standard-basic" label="3" />
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
            <div style={{marginTop: '30px'}}>
                <Row>
                    <Col>
                        <h4>{'Q3 How do you rate the quality of your present skills/knowledge overall?'}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col className="answer">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Quality</FormLabel>
                            <RadioGroup row aria-label="quality" name="quality" value={quality} onChange={handleQualityChange}>
                                <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
                                <FormControlLabel value="Average" control={<Radio />} label="Average" />
                                <FormControlLabel value="Just Right" control={<Radio />} label="Just Right" />
                                <FormControlLabel value="Good" control={<Radio />} label="Good" />
                                <FormControlLabel value="Very Good" control={<Radio />} label="Very Good" />
                            </RadioGroup>
                        </FormControl>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
            <div style={{marginTop: '30px'}}>
                <Row>
                    <Col>
                        <h4>{'Q4 How do you plan to enhance that performance indicator?'}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormControl style={{margin: '0px', marginLeft: '35px'}} component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Please tick</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={workshops} onChange={handleCheckboxChange} name="workshops" />}
                                    label="Workshops"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={certifications} onChange={handleCheckboxChange} name="certifications" />}
                                    label="Certifications"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={shortCourses} onChange={handleCheckboxChange} name="shortCourses" />}
                                    label="Short Courses"
                                />
                            </FormGroup>
                            {/* <FormHelperText>Be careful</FormHelperText> */}
                        </FormControl>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
            <div style={{marginTop: '30px'}}>
                <Row>
                    <Col>
                        <h4>{'Q5 How do you rate the quality of your present skills/knowledge overall?'}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col className="answer">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Yes/No</FormLabel>
                            <RadioGroup row aria-label="question5" name="question5" value={answer} onChange={handleAnswerChange}>
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
            {/* <div style={{marginTop: '30px'}}>
                <Row>
                    <Col>
                        <h4>{'Q1 What do you do?'}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextField fullWidth className="answer" id="standard-basic" label="Job" />
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
            <div style={{marginTop: '30px'}}>
                <Row>
                    <Col>
                        <h4>{'Q1 What do you do?'}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextField fullWidth className="answer" id="standard-basic" label="Job" />
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
            <div style={{marginTop: '30px'}}>
                <Row>
                    <Col>
                        <h4>{'Q1 What do you do?'}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextField fullWidth className="answer" id="standard-basic" label="Job" />
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
            <div style={{marginTop: '30px', marginBottom: '70px'}}>
                <Row>
                    <Col>
                        <h4>{'Q1 What do you do?'}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextField fullWidth className="answer" id="standard-basic" label="Job" />
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div> */}
            <Row>
                 <Col style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '30px'}}>
                    <Link to="/write"><Button size="lg" variant="primary">Continue</Button></Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Survey;