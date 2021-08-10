import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import { Slider } from '@material-ui/core';
import './Survey.css';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 300 + theme.spacing(3) * 2,
    },
    margin: {
      height: theme.spacing(3),
    },
}));

const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

const Survey = ({setSurvey}) => {
    const [quality, setQuality] = useState('');
    const [q1, setQ1] = useState(0);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [checkbox, setCheckbox] = useState({
        workshops: false,
        certifications: false,
        shortCourses: false
    });

    const classes = useStyles();
    // const classes = useCheckboxStyles();

    const onQ1Change = (event, newValue) => {
        setQ1(newValue);
        console.log(q1);
    }

    // useEffect(() => {
    //     const survey = {
    //         q1: q1,
    //         q2: [q2A, q2B, q2C]
    //     }
    //     setSurvey(survey);
    //     console.log(survey);
    // }, [q1, q2A, q2B, q2C]);

    // const handleQ1Change = (event) => {
    //     setQ1(event.target.value)
    // };

    // const handleQ2AChange = (event) => {
    //     setQ2A(event.target.value)
    // };

    // const handleQ2BChange = (event) => {
    //     setQ2B(event.target.value)
    // };

    // const handleQ2CChange = (event) => {
    //     setQ2C(event.target.value)
    // };

    // const handleCheckboxChange = (event) => {
    //     setCheckbox({ ...checkbox, [event.target.name]: event.target.checked });
    // };

    // const handleQualityChange = (event) => {
    //     setQuality(event.target.value);
    // };

    // const handleAnswerChange = (event) => {
    //     setAnswer(event.target.value);
    // };

    // const { workshops, certifications, shortCourses } = checkbox;

    return (
        <Container className="survey" fluid="true">
            <Row style={{borderBottom: '2px solid black', display: 'flex', flexDirection: 'column'}}>
                <h2>Which courses will advance your career?</h2>
                <h5>Reflect on your career goal and challenges and get course recommendations!</h5>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{margin: '200px 0', border: '1.5px solid blue', padding: '10px', borderRadius: '25px'}}>
                    <div style={{padding: '20px'}}>
                        <h3 style={{marginBottom: '25px'}}>{`1. I see my work performance as above my organization’s expectation.`}</h3>
                        <PrettoSlider valueLabelDisplay="auto" value={q1} onChange={onQ1Change} aria-labelledby="continuous-slider" />
                        <Button style={{justifySeld: 'end'}} variant='primary'>Next</Button>
                    </div>
                </div>
            </Row>
        </Container>
    );
}


export default Survey;

{/* <Container className="survey" fluid="true">
            <Row style={{borderBottom: '2px solid black', display: 'flex', flexDirection: 'column'}}>
                <h2>Which courses will advance your career?</h2>
                <h5>Reflect on your career goal and challenges and get course recommendations!</h5>
            </Row>
            <Row style={{display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', justifyItems: 'stretch'}}>
                <h3 style={{border: '2px solid black'}}>Bro</h3>
                <h3 style={{border: '2px solid black'}}>HEHEHEHEHH</h3>
                <h3 style={{border: '2px solid black'}}>aaasdasd</h3>
            </Row>
        </Container> */}

// <Container className="survey" fluid="true">
//     <Row>
//         <Col>
//             <h1>Welcome!</h1>
//         </Col>
//     </Row>
//     <Row>
//         <Col>
//             <h3>We would like to invite you for a quick survey.</h3>
//             <p>Please fill out this survey to help you for the work challenge statement</p>
//         </Col>
//     </Row>
//     <div style={{marginTop: '30px'}}>
//         <Row>
//             <Col>
//                 <h4>{'Q1 What do you do?'}</h4>
//             </Col>
//         </Row>
//         <Row>
//             <Col>
//                 <TextField onChange={handleQ1Change} fullWidth className="answer" id="standard-basic" label="Job" />
//             </Col>
//             <Col>
//             </Col>
//         </Row>
//     </div>
//     <div style={{marginTop: '30px'}}>
//         <Row>
//             <Col>
//                 <h4>{'Q2 List three key performance indicators for your job'}</h4>
//             </Col>
//         </Row>
//         <Row>
//             <Col>
//                 <TextField onChange={handleQ2AChange} fullWidth className="answer" id="standard-basic" label="1" />
//             </Col>
//             <Col>
//             </Col>
//         </Row>
//         <Row>
//             <Col>
//                 <TextField onChange={handleQ2BChange} fullWidth className="answer" id="standard-basic" label="2" />
//             </Col>
//             <Col>
//             </Col>
//         </Row>
//         <Row>
//             <Col>
//                 <TextField onChange={handleQ2CChange} fullWidth className="answer" id="standard-basic" label="3" />
//             </Col>
//             <Col>
//             </Col>
//         </Row>
//     </div>
//     <div style={{marginTop: '30px'}}>
//         <Row>
//             <Col>
//                 <h4>{'Q3 How do you rate the quality of your present skills/knowledge overall?'}</h4>
//             </Col>
//         </Row>
//         <Row>
//             <Col className="answer">
//                 <FormControl component="fieldset">
//                     <FormLabel component="legend">Quality</FormLabel>
//                     <RadioGroup row aria-label="quality" name="quality" value={quality} onChange={handleQualityChange}>
//                         <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
//                         <FormControlLabel value="Average" control={<Radio />} label="Average" />
//                         <FormControlLabel value="Just Right" control={<Radio />} label="Just Right" />
//                         <FormControlLabel value="Good" control={<Radio />} label="Good" />
//                         <FormControlLabel value="Very Good" control={<Radio />} label="Very Good" />
//                     </RadioGroup>
//                 </FormControl>
//             </Col>
//             <Col>
//             </Col>
//         </Row>
//     </div>
//     <div style={{marginTop: '30px'}}>
//         <Row>
//             <Col>
//                 <h4>{'Q4 How do you plan to enhance that performance indicator?'}</h4>
//             </Col>
//         </Row>
//         <Row>
//             <Col>
//                 <FormControl style={{margin: '0px', marginLeft: '35px'}} component="fieldset" className={classes.formControl}>
//                     <FormLabel component="legend">Please tick</FormLabel>
//                     <FormGroup>
//                         <FormControlLabel
//                             control={<Checkbox checked={workshops} onChange={handleCheckboxChange} name="workshops" />}
//                             label="Workshops"
//                         />
//                         <FormControlLabel
//                             control={<Checkbox checked={certifications} onChange={handleCheckboxChange} name="certifications" />}
//                             label="Certifications"
//                         />
//                         <FormControlLabel
//                             control={<Checkbox checked={shortCourses} onChange={handleCheckboxChange} name="shortCourses" />}
//                             label="Short Courses"
//                         />
//                     </FormGroup>
//                     {/* <FormHelperText>Be careful</FormHelperText> */}
//                 </FormControl>
//             </Col>
//             <Col>
//             </Col>
//         </Row>
//     </div>
//     <div style={{marginTop: '30px'}}>
//         <Row>
//             <Col>
//                 <h4>{'Q5 How do you rate the quality of your present skills/knowledge overall?'}</h4>
//             </Col>
//         </Row>
//         <Row>
//             <Col className="answer">
//                 <FormControl component="fieldset">
//                     <FormLabel component="legend">Yes/No</FormLabel>
//                     <RadioGroup row aria-label="question5" name="question5" value={answer} onChange={handleAnswerChange}>
//                         <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//                         <FormControlLabel value="no" control={<Radio />} label="No" />
//                     </RadioGroup>
//                 </FormControl>
//             </Col>
//             <Col>
//             </Col>
//         </Row>
//     </div>
//     {/* <div style={{marginTop: '30px'}}>
//         <Row>
//             <Col>
//                 <h4>{'Q1 What do you do?'}</h4>
//             </Col>
//         </Row>
//         <Row>
//             <Col>
//                 <TextField fullWidth className="answer" id="standard-basic" label="Job" />
//             </Col>
//             <Col>
//             </Col>
//         </Row>
//     </div>
//     <div style={{marginTop: '30px'}}>
//         <Row>
//             <Col>
//                 <h4>{'Q1 What do you do?'}</h4>
//             </Col>
//         </Row>
//         <Row>
//             <Col>
//                 <TextField fullWidth className="answer" id="standard-basic" label="Job" />
//             </Col>
//             <Col>
//             </Col>
//         </Row>
//     </div>
//     <div style={{marginTop: '30px'}}>
//         <Row>
//             <Col>
//                 <h4>{'Q1 What do you do?'}</h4>
//             </Col>
//         </Row>
//         <Row>
//             <Col>
//                 <TextField fullWidth className="answer" id="standard-basic" label="Job" />
//             </Col>
//             <Col>
//             </Col>
//         </Row>
//     </div>
//     <div style={{marginTop: '30px', marginBottom: '70px'}}>
//         <Row>
//             <Col>
//                 <h4>{'Q1 What do you do?'}</h4>
//             </Col>
//         </Row>
//         <Row>
//             <Col>
//                 <TextField fullWidth className="answer" id="standard-basic" label="Job" />
//             </Col>
//             <Col>
//             </Col>
//         </Row>
//     </div> */}
//     <Row>
//         <Col style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '30px'}}>
//             <Link to="/write"><Button size="lg" variant="primary">Continue</Button></Link>
//         </Col>
//     </Row>
// </Container>