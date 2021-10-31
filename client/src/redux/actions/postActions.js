import * as api from '../api.js';

import {
    GET_POST_SUCCESS,
    GET_POSTS_SUCCESS,
    CREATE_POST_SUCCESS,
    DELETE_POST_SUCCESS,
    UPDATE_POST_SUCCESS,
    LIKE_POST, ADD_COMMENT_SUCCESS,
    GET_POST_BY_SEARCH,
    START_LOADING,
    END_LOADING,
    GET_USER_POSTS, SAVE_POST, GET_SAVED_POSTS
} from '../constants/postConstants.js';

// import { SUCCESS, WARNING, ERROR, INFO } from '../constants/userConstants';

// import { Alert } from '../Alert';

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getPost(id);
        // console.log(data);
        dispatch({ type: GET_POST_SUCCESS, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.response);
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

export const savePost = (userId, post) => async (dispatch) => {
    try {
        const { data } = await api.savePost(userId, post);
        dispatch({ type: SAVE_POST, payload: data });

    } catch (error) {
        console.log(error.response);
    }
}

export const getSavedPosts = (userId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getSavedPosts(userId);
        dispatch({ type: GET_SAVED_POSTS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.response);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.createPost(post);
        dispatch({ type: CREATE_POST_SUCCESS, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.response);
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

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.updatePost(id, updatedPost);
        console.log("postActions", data);
        dispatch({ type: UPDATE_POST_SUCCESS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.response);
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