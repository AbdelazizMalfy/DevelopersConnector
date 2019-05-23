import axios from 'axios';


// Add post 
export const addPost = (newPost) => dispatch => {
    axios.post('/api/posts', newPost)
        .then(res => 
            dispatch({
                type: 'ADD_POST',
                payload: res.data
            })
            ).catch(err => 
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err.response.data
                })
                )
}