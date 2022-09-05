import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts= async () => await axios.get(url);
export const createPosts = async (newPost) => await axios.post(url, newPost);
export const getAllData = async () => await axios.get(`${url}/every`);
export const updatePost = async (id, updatedPost) => await axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = async (id) => await axios.delete(`${url}/${id}`);
export const likePost = async (id) => await axios.patch(`${url}/${id}/likePost`);