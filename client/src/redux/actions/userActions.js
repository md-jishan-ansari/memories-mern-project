import * as api from '../api';

import { AUTH, UPDATE_ME, SUCCESS, WARNING, ERROR, INFO } from '../constants/userConstants';


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

export const updateMe = (userData) => async (dispatch) => {
    try {
        const { data } = await api.updateMe(userData);
        dispatch({ type: UPDATE_ME, payload: data });
        Alert(SUCCESS, "Update successfull!");
    } catch (error) {
        Alert(ERROR, error.response.data.message);
    }
}

export const updatePassword = (userData) => async (dispatch) => {
    try {
        const { data } = await api.updatePassword(userData);
        dispatch({ type: AUTH, payload: data });
        Alert(SUCCESS, "updatePassword successfull!");

    } catch (error) {
        Alert(ERROR, error.response.data.message);
    }
}

export const forgotPassword = (userData) => async (dispatch) => {
    try {
        Alert(INFO, "Please wait! Your data is processed...");
        const { data } = await api.forgotPassword(userData);
        Alert(SUCCESS, "Token send to your email");

    } catch (error) {

        Alert(ERROR, error.response.data.message);
    }
}

export const resetPassword = (userData, token, history) => async (dispatch) => {
    try {
        await api.resetPassword(userData, token);
        Alert(SUCCESS, "password reset successful");
        history.push('/user/login');
    } catch (error) {
        Alert(ERROR, error.response.data.message);
    }
}

