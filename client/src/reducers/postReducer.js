const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function (state=initialState,action) {
    switch (action.type) {
        default:
            return state;
        case 'ADD_POST':
            return {
                ...state,
                posts:[action.payload, ...state.posts]
            }
        case 'POST_LOADING':
            return {
                ...state,
                loading:true
            }
        case 'GET_POSTS':
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
    }
}