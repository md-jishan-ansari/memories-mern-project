import * as api from '../api';

import { AUTH } from '../constants/userConstants';

export const login = (userData, history) => async (dispatch) => {
    try {
        const { data } = await api.login(userData);
        dispatch({ type: AUTH, payload: data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (userData, history) => async (dispatch) => {
    try {
        const { data } = await api.signup(userData);
        dispatch({ type: AUTH, payload: data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}