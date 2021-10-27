import axios from 'axios';

import variable from '../config.js';
const { DB_ROUTE } = variable;

const Api = axios.create({ baseURL: DB_ROUTE });

Api.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user) {
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
})

export const getPost = (id) => Api.get(`/api/v1/posts/${id}`);
export const getPosts = (page) => Api.get(`/api/v1/posts?page=${page}`);
export const getPostBySearch = (search, tags) => Api.get(`/api/v1/posts/search?search=${search}&tags=${tags}`);
export const createPost = (post) => Api.post('/api/v1/posts', post);
export const deletePost = (postId) => Api.delete(`/api/v1/posts`, { data: postId });
export const likePost = ({ postId, userId }) => Api.patch('/api/v1/posts/post', { postId, userId });
export const updatePost = (id, updatedPost) => Api.patch(`/api/v1/posts/${id}`, updatedPost);
export const addComment = (id, comment) => Api.patch(`/api/v1/posts/${id}/comment`, { comment });

export const login = (userData) => Api.post('/api/v1/user/login', userData);
export const signup = (userData) => Api.post('/api/v1/user/signup', userData);