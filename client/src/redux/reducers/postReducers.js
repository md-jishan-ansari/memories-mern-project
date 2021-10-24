import { GET_POST_SUCCESS, GET_POSTS_SUCCESS, CREATE_POST_SUCCESS, DELETE_POST_SUCCESS, UPDATE_POST_SUCCESS, LIKE_POST, ADD_COMMENT_SUCCESS, GET_POST_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/postConstants.js';

export const postsReducer = (state = { posts: [], currentPage: 1, numberOfPages: 1, isProgress: true }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isProgress: true }
        case END_LOADING:
            return { ...state, isProgress: false }
        case GET_POST_SUCCESS:
            return { ...state, post: action.payload.data, isProgress: false }
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                isProgress: false
            };
        case GET_POST_BY_SEARCH:
            return {
                ...state,
                posts: action.payload.data,
                isProgress: false
            }
        case CREATE_POST_SUCCESS:
            return { ...state, posts: [action.payload, ...state.posts.slice(0, state.posts.length - 1)], isProgress: false }
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
                isProgress: false
            };
        case ADD_COMMENT_SUCCESS:
        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
                isProgress: false
            };
        case DELETE_POST_SUCCESS:
            state.posts = state.posts.filter(post => post._id !== action.payload);
            return {
                ...state,
            };
        default: return state;
    }
}