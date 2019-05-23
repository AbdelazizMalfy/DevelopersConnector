import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authAction'
import { clearCurrentProfile } from './actions/profileAction'
import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import PrivateRoute from './components/common/PrivateRoute';
import AddExp from './components/add-profile-info/AddExp';
import AddEdu from './components/add-profile-info/AddEdu';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/Posts/Posts';

import './App.css';


// Check for token

if(localStorage.jwtToken){
  //Set auth token header
  setAuthToken(localStorage.jwtToken)
  // Decode token and get info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Clear current Profile
  store.dispatch(clearCurrentProfile());
}

function App() {
  return (
    <Provider store = {store}>
        <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component = { Landing } />
          <div className="container">
            <Route exact path="/register" component = { Register } />
            <Route exact path="/login" component = { Login } />
            <Switch>
              <PrivateRoute exact path="/dashboard" component = { Dashboard } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component = { CreateProfile } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit-profile" component = { EditProfile } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-experience" component = { AddExp } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-education" component = { AddEdu } />
            </Switch>
            <Route exact path="/profiles" component = { Profiles } />
            <Route exact path="/profile/:handle" component = { Profile } />
            <Switch>
              <PrivateRoute exact path="/feed" component = { Posts } />
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
