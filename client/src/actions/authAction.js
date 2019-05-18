import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';


// Register User

export const registerUser = (userData,history) => dispatch => {
    axios
        .post('/api/users/register',userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: 'GET_ERRORS',
                payload: err.response.data
            })
        );
};

// Login - GET user Token

export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // Extract token
            const { token } = res.data;
            // save token to local storage
            localStorage.setItem('jwtToken', token);
            // Set tokem to Auth header
            setAuthToken(token);
            // Decode token to get user Data
            const decoded = jwt_decode(token)
            // Set current user 
            dispatch ( setCurrentUser(decoded));
        }).catch(err =>
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err.response.data
                })
            )
}

// Set Logged in User 

export const setCurrentUser = ( decoded ) => {
    return {
        type: 'SET_CURRENT_USER',
        payload : decoded
    }
}


// Log user out

export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future Requests
    setAuthToken(false);
    //set current user to {} and isAuthenticated to false
    dispatch(setCurrentUser({}));
}