import axios from 'axios';

// Get current Profile 

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => 
            dispatch ({
                type: 'GET_PROFILE',
                payload: res.data
            })
        )
        .catch( err => 
            dispatch({
                type:'GET_PROFILE',
                payload: {}
            })
            )
}



// Set Profile to be loading

export const setProfileLoading = () => {
    return {
        type : 'PROFILE_LOADING'
    }
}

// Clear Current Profile

export const clearCurrentProfile = () => {
    return {
        type : 'CLEAR_CURRENT_PROFILE'
    }
}

// Create New Profile

export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch( err => 
            dispatch ({
                type: 'GET_ERRORS',
                payload: err.response.data
            })
            )
}

//Add Experience

export const addExp = (newExp,history) => dispatch => {
    axios.post('/api/profile/experience', newExp)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch ({
                type: 'GET_ERRORS',
                payload: err.response.data
            })
            )
}





// Delete Account and Profile 

export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you Sure ?')) {
        axios
            .delete('/api/profile')
            .then( res => 
                dispatch ({
                    type: 'SET_CURRENT_USER',
                    payload: {}
                })
                ).catch( err => 
                    dispatch({
                        type: 'GET_ERRORS',
                        payload: err.response.data
                    })
                    )
    }
}
