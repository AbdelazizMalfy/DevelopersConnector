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

// Clear Current Profiel

export const clearCurrentProfile = () => {
    return {
        type : 'CLEAR_CURRENT_PROFILE'
    }
}