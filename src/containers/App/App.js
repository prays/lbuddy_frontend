import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Container from 'react-bootstrap/Container';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Recommendation from '../../components/Recommendation/Recommendation';
import Footer from '../../components/Footer/Footer';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import Guide from '../../components/Guide/Guide';
import Survey from '../../components/Survey/Survey';
import Admin from '../Admin/Admin';
import MyCourses from '../MyCourses/MyCourses';
import './App.css';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import Reload from '../../components/Reload/Reload';
import jsonData from './courses.json';

const loadData = () => JSON.parse(JSON.stringify(jsonData));
const readCourses = loadData();

// const initialUser = {
//   email: 'pray@gmail.com',
//   first_name: 'Pray',
//   last_name: 'Apostel',
//   group_id: 2,
//   courses: [
//     {
//       "id": 1,
//       "email": "pray@gmail.com",
//       "course": "ARM Processor for Embedded IoT System: Architecture, Interfacing and Programming",
//       "joined": "2021-07-07T14:18:47.000Z"
//     },
//     {
//       "id": 2,
//       "email": "pray@gmail.com",
//       "course": "CET104 Hardware in the Information Age",
//       "joined": "2021-07-07T14:19:03.000Z"
//     },
//     {
//       "id": 3,
//       "email": "pray@gmail.com",
//       "course": "CET817 Project Financing -C",
//       "joined": "2021-07-07T14:19:14.000Z"
//     }
//   ],
//   joined: '2021-07-07T14:18:47.000Z'
// }

const initialUser = {
  email: '',
  first_name: '',
  last_name: '',
  group_id: 2,
  courses: [],
  joined: ''
}

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [survey, setSurvey] = useState({
    q1: '',
    q2: []
  });

  const loadUser = (data) => {
    setUser(data);
  }

  useEffect(() => {
    Reload(loadUser, setIsSignedIn);
  }, []);

  return (
    <Container fluid="true">
      <NavigationBar setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />
      <div className="body">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/sign-in">
            <SignIn setIsSignedIn={setIsSignedIn} loadUser={loadUser} />
          </Route>
          <Route path="/sign-up">
            <SignUp setIsSignedIn={setIsSignedIn} loadUser={loadUser} />
          </Route>
          <PrivateRoute path="/write" component={Recommendation} user={user} survey={survey} readCourses={readCourses} />
          <PrivateRoute path="/my-courses" component={MyCourses} user={user} readCourses={readCourses} />
          <PrivateRoute path="/guide" component={Guide} />
          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute path="/survey" component={Survey} setSurvey={setSurvey} />  
        </Switch>
        <Footer />
      </div>
    </Container>
  );
}

export default App;