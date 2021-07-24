import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Modal from 'react-bootstrap/Modal';
// import Radio from '@material-ui/core/Radio';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import { WEBSITE_LINK } from '../../constants.js';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SnackbarError from '../SnackbarError/SnackbarError';

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  
  const onFirstNameChange = (event) => {
    setFirstName(event?.target?.value);
  }

  const onLastNameChange = (event) => {
    setLastName(event?.target?.value);
  }

  const onEmailChange = (event) => {
    setEmail(event?.target?.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event?.target?.value);
  }

  const onSubmitSignUp = async () => {
    if (firstName && lastName && email && password) {
      try {
        const response = await fetch(`${WEBSITE_LINK}/register`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              first_name: firstName,
              last_name: lastName,
              email: email,
              password: password,
              group_id: Math.floor(Math.random() * 10) + 1
          })
        })
        const user = await response.json();
        if (user.email) {
          loadUser(user);
          await setIsSignedIn(true);
          history.push('/guide');
        } else {
          setError('Oops, unexpected error. Please make sure your email is not being used before.');
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setError('Please fill in all the field.')
      setOpenSnackbar(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={onFirstNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={onLastNameChange}
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