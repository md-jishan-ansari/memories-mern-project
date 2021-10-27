import * as api from '../api';

import { AUTH, GET_USER_POSTS } from '../constants/userConstants';
import { START_LOADING, END_LOADING } from '../constants/postConstants';


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

export const getUserPosts = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getUserPosts(id);
        dispatch({ type: GET_USER_POSTS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.response);
    }
}