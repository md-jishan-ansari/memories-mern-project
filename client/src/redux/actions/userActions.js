import * as api from '../api';

import { AUTH, SUCCESS, WARNING, ERROR, INFO } from '../constants/userConstants';


import { Alert } from '../Alert';

export const login = (userData, history) => async (dispatch) => {
    try {
        const { data } = await api.login(userData);
        dispatch({ type: AUTH, payload: data });
        Alert(SUCCESS, "Login successfull!");
        history.push('/');
    } catch (error) {
        Alert(ERROR, error.response.data.message);
    }
}

export const signup = (userData, history) => async (dispatch) => {
    try {
        const { data } = await api.signup(userData);
        dispatch({ type: AUTH, payload: data });
        Alert(SUCCESS, "Signup successfull!");
        history.push('/');
    } catch (error) {
        Alert(ERROR, error.response.data.message);
    }
}