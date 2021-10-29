import { AUTH, LOGOUT, UPDATE_ME } from '../constants/userConstants';

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify(action.payload));
            return { ...state, user: action.payload };
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state };
        case UPDATE_ME:
            let profile = JSON.parse(localStorage.getItem('profile'));
            profile.userData = action.payload.userData;
            localStorage.setItem("profile", JSON.stringify(profile));
            return { ...state, user: action.payload }
        default: return state;
    }
}