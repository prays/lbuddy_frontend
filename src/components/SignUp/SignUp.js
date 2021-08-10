import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Modal from 'react-bootstrap/Modal';
// import Radio from '@material-ui/core/Radio';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { WEBSITE_LINK } from '../../constants.js';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SnackbarError from '../SnackbarError/SnackbarError';
import blockSQLInjection, { blockXSS } from '../Security/Security.js';
import Datepicker from '../Datepicker/Datepicker';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ loadUser, setIsSignedIn }) {
  const [fullName, setFullName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [job, setJob] = useState('');
  const [yearJoined, setYearJoined] = useState('');
  const [industry, setIndustry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  
  const onFullNameChange = (event) => {
    setFullName(event?.target?.value);
  }

  const onBirthdateChange = (date) => {
    setBirthdate(date);
  }

  const onGenderChange = (event) => {
    setGender(event?.target?.value);
  }

  const onEducationChange = (event) => {
    setEducation(event?.target?.value);
  }

  const onJobChange = (event) => {
    setJob(event?.target?.value);
  }

  const onYearJoinedChange = (event) => {
    setYearJoined(event?.target?.value);
  }

  const onIndustryChange = (event) => {
    setIndustry(event?.target?.value);
  }

  const onEmailChange = (event) => {
    setEmail(event?.target?.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event?.target?.value);
  }

  const saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  const onSubmitSignUp = async () => {
    if (fullName && birthdate && gender && education && job && yearJoined && industry && email && password) {
      try {
        const formArray = [fullName, gender, education, job, yearJoined, industry, email, password];
        formArray.forEach(item => {
          blockSQLInjection(item);
          blockXSS(item);
        })
        try {
          const response = await fetch(`${WEBSITE_LINK}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                fullName: fullName,
                birthdate: birthdate,
                gender: gender,
                education: education,
                job: job,
                yearJoined: yearJoined,
                groupID: Math.floor(Math.random() * 2) + 1,
                password: password,
            })
          })
          const data = await response.json();
          console.log(data);
          if (data && data.email) {
            const response = await fetch(`${WEBSITE_LINK}/sign-in`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  email: email,
                  password: password
              })
            })
            const data = await response.json();
            if (data.email && data.success === 'true') {
              saveAuthTokenInSession(data.token);
              fetch(`${WEBSITE_LINK}/sign-in`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': data.token
                }
              })
              .then(resp => resp.json())
              .then(result => {
                if (result && result.email) {
                  fetch(`${WEBSITE_LINK}/profile/${result.email}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': data.token
                    }
                  })
                  .then(resp => resp.json())
                  .then(user => {
                    if (user && user.email) {
                      fetch(`${WEBSITE_LINK}/get-courses`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': window.sessionStorage.getItem('token')
                        },
                        body: JSON.stringify({
                          email: email
                        })
                      })
                      .then(resp => resp.json())
                      .then(myCourses => {
                        loadUser(Object.assign({}, user, { courses: myCourses }));
                        setIsSignedIn(true);
                        history.push('/');
                      })
                    }
                  })
                  .catch(console.log)
                }
              })
              .catch(console.log)
            } else {
              setError('Incorrect combination of email and password. Please try again.');
              setOpenSnackbar(true);
            }
          } else {
            setError('Oops, unexpected error. Please make sure your email is not being used before.');
            setOpenSnackbar(true);
          }
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        setError(`Invalid character detected (#, ', ", -). Kindly change your input.`);
        setOpenSnackbar(true);
      }
    } else {
      setError('Please fill in all the field.')
      setOpenSnackbar(true);
    }
  }

  return (
    <Container style={{padding: '75px 30px', paddingTop: '0'}} component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                onChange={onFullNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Datepicker birthdate={birthdate} onBirthdateChange={onBirthdateChange} />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row aria-label="gender" name="gender1" value={gender} onChange={onGenderChange}>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="education"
                label="Highest educational qualification attained"
                name="education"
                autoComplete="education"
                onChange={onEducationChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="job"
                label="Present job title"
                name="job"
                autoComplete="job"
                onChange={onJobChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="yearJoined"
                label="Year you joined the organisation"
                name="yearJoined"
                autoComplete="yearJoined"
                onChange={onYearJoinedChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="industry"
                label="Industry of work"
                name="industry"
                autoComplete="industry"
                onChange={onIndustryChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onPasswordChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">{'Group Number:'}</FormLabel>
                <RadioGroup 
                style={{ display: 'flex', flexDirection: 'row'}}
                aria-label="groupNumber" 
                name="groupNumber" 
                value={group} 
                onChange={onGroupChange}>
                  <FormControlLabel value={'1'} control={<Radio />} label="1" />
                  <FormControlLabel value={'2'} control={<Radio />} label="2" />
                </RadioGroup>
              </FormControl>
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmitSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={5}>
        {' '}
      </Box>
      <SnackbarError openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} error={error} />
      <MyModal 
      show={modalShow}
      onHide={() => {
        setModalShow(false);
        window.open("http://stackoverflow.com");
        history.push('/');
      }}
      />
    </Container>
  );
}

function MyModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Body>
        <h4>Complete a survey</h4>
        <p style={{fontSize: '1.2em'}}>
          It looks like this is your first time here. In order to have
          the best experience, please complete a survey in where we
          will redirect you to.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="contained" color="primary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}