import axios from 'axios';

import DB_ROUTE from '../config.js';

const Api = axios.create({ baseURL: `${DB_ROUTE}/api/v1/` });

Api.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user) {
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
})

export const getPost = (id) => Api.get(`/posts/${id}`);
export const getPosts = (page) => Api.get(`/posts?page=${page}`);
export const getPostBySearch = (search, tags) => Api.get(`/posts/search?search=${search}&tags=${tags}`);
export const createPost = (post) => Api.post('/posts', post);
export const deletePost = (postId) => Api.delete(`/posts`, { data: postId });
export const likePost = ({ postId, userId }) => Api.patch('/posts/post', { postId, userId });
export const updatePost = (id, updatedPost) => Api.patch(`/posts/${id}`, updatedPost);
export const addComment = (id, comment) => Api.patch(`/posts/${id}/comment`, { comment });

export const login = (userData) => Api.post('/user/login', userData);
export const signup = (userData) => Api.post('/user/signup', userData);