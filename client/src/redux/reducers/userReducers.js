import { AUTH, LOGOUT } from '../constants/userConstants';

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify(action.payload));
            return { ...state, user: action.payload };
        case LOGOUT:
            localStorage.removeItem('profile');
            return state;
        default: return state;
    }
}