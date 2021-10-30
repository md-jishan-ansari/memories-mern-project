import {
    GET_POST_SUCCESS,
    GET_POSTS_SUCCESS,
    CREATE_POST_SUCCESS,
    DELETE_POST_SUCCESS,
    UPDATE_POST_SUCCESS,
    LIKE_POST,
    ADD_COMMENT_SUCCESS,
    GET_POST_BY_SEARCH,
    START_LOADING,
    END_LOADING,
    GET_USER_POSTS, SAVE_POST, GET_SAVED_POSTS
} from '../constants/postConstants.js';

export const postsReducer = (state = { posts: [], currentPage: 1, numberOfPages: 1, isProgress: true, userPosts: [], savedPosts: [], savedIds: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isProgress: true }
        case END_LOADING:
            return { ...state, isProgress: false }
        case GET_POST_SUCCESS:
            return { ...state, post: action.payload.data }
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case GET_POST_BY_SEARCH:
            return {
                ...state,
                posts: action.payload.data,
            }
        case CREATE_POST_SUCCESS:
            return { ...state, posts: [action.payload, ...state.posts.slice(0, state.posts.length === 8 ? (state.posts.length - 1) : state.posts.length)], userPosts: [action.payload, ...state.userPosts] }
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload.post._id ? action.payload.post : post),
                userPosts: state.userPosts.map(post => post._id === action.payload.post._id ? action.payload.post : post),
            };
        case ADD_COMMENT_SUCCESS:
        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state, posts: state.posts.filter(post => post._id !== action.payload), userPosts: state.userPosts.filter(post => post._id !== action.payload)
            };
        case GET_USER_POSTS:
            return { ...state, userPosts: action.payload.posts };
        case SAVE_POST:
            if (state.savedIds.includes(action.payload.savedPost._id)) {
                return { ...state, savedPosts: state.savedPosts.filter(post => post._id !== action.payload.savedPost._id), savedIds: state.savedIds.filter(id => id !== action.payload.savedPost._id) };
            }

            return { ...state, savedPosts: [...state.savedPosts, action.payload.savedPost], savedIds: [action.payload.savedPost._id, ...state.savedIds] };
        case GET_SAVED_POSTS:
            return { ...state, savedPosts: action.payload.savedPosts, savedIds: action.payload.savedIds }
        default: return state;
    }
}