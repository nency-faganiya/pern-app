import { FETCH_ALL, CREATE, FETCH_EVERY, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';

// Action creator function that return action

export const getPosts = () => async (dispatch) => {
    try{
        const {data} = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });
    }catch(err){
        console.log(err);
    }
}

export const createPosts = (post) => async (dispatch) => {
    try{
        const {data} = await api.createPosts(post);
        dispatch({ type: CREATE, payload: data });
    }catch(err){
        console.log(err);
    }
}

export const getAllData = () => async (dispatch) => {
    try{
        const {data} = await api.getAllData();
        dispatch({ type: FETCH_EVERY, payload: data });
    }catch(err){
        console.log(err);
    }
}

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try{
        const { data } = await api.updatePost(id, updatedPost);
        dispatch({ type: UPDATE, payload: data })
    }catch(err){
        console.log(err);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id })
    }catch(err){
        console.log(err);
    }
}

export const likePost = (id) => async (dispatch) => {
    try{
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data });
    }catch(err){
        console.log(err);
    }
}
// export default getPosts;