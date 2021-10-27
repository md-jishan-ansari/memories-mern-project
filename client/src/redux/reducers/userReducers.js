import { AUTH, LOGOUT, GET_USER_POSTS } from '../constants/userConstants';

export const userReducer = (state = { user: {}, userPosts: {} }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify(action.payload));
            return { ...state, user: action.payload };
        case LOGOUT:
            localStorage.removeItem('profile');
            return state;
        case GET_USER_POSTS:
            return { ...state, userPosts: action.payload };
        default: return state;
    }
}