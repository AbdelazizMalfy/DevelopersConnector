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


// Get all posts 
export const getPosts = () => dispatch =>{
    dispatch(setPostLoading())
    axios.get('/api/posts')
        .then(res => 
            dispatch ({
              type: 'GET_POSTS',
              payload: res.data  
            })).catch (err => 
                dispatch ({
                    type: 'GET_POSTS',
                    payload: null
                })
                )
}

// Set post loading 
export const setPostLoading = () => {
    return {
        type: 'POST_LOADING'
    }
}