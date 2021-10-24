import * as api from '../api.js';

import { GET_POST_SUCCESS, GET_POSTS_SUCCESS, CREATE_POST_SUCCESS, DELETE_POST_SUCCESS, UPDATE_POST_SUCCESS, LIKE_POST, ADD_COMMENT_SUCCESS, GET_POST_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/postConstants.js';


export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.getPost(id);
        dispatch({ type: GET_POST_SUCCESS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.getPosts(page);
        dispatch({ type: GET_POSTS_SUCCESS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log("backend is not called", error);
    }
}

export const getPostBySearch = (search, tags) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.getPostBySearch(search, tags);
        dispatch({ type: GET_POST_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.createPost(post);
        dispatch({ type: CREATE_POST_SUCCESS, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const postId = { id };
        await api.deletePost(postId);
        dispatch({ type: DELETE_POST_SUCCESS, payload: id });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, updatedPost, history) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost);
        dispatch({ type: UPDATE_POST_SUCCESS, payload: data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const likePost = ({ postId, userId }) => async (dispatch) => {
    try {
        const { data } = await api.likePost({ postId, userId });
        dispatch({ type: LIKE_POST, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const addComment = (id, comment) => async (dispatch) => {
    try {
        const { data } = await api.addComment(id, comment);
        dispatch({ type: ADD_COMMENT_SUCCESS, payload: data });
    } catch (error) {
        console.log(error);
    }
}