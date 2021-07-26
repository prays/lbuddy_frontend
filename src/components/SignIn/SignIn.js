import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { WEBSITE_LINK } from '../../constants.js';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ loadUser, setIsSignedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  
  const onEmailChange = (event) => {
    setEmail(event?.target?.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event?.target?.value);
  }

  const onSubmitSignIn = async () => {
    if (email && password) {
      try {
        const response = await fetch(`${WEBSITE_LINK}/sign-in`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              email: email,
              password: password
          })
        })
        const user = await response.json();
        if (user.email) {
          try {
            const data = await fetch(`${WEBSITE_LINK}/get-courses`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                email: email
              })
            });
            const myCourses = await data.json();
            console.log(myCourses)
            loadUser(Object.assign({}, user, { courses: myCourses }));
            await setIsSignedIn(true);
            history.push('/');
          } catch (error) {
            console.log(error);
          }
        } else {
          setError('Incorrect combination of email and password. Please try again.');
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setError('Please fill in all the field.');
      setOpenSnackbar(true);
    }
  }

  return (
    <Container style={{padding: '70px 0'}} component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onPasswordChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmitSignIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        {' '}
      </Box>
      <SnackbarError openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} error={error} />
    </Container>
  );
}