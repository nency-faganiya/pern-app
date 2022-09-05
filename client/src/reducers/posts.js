import { FETCH_ALL, CREATE, FETCH_EVERY, UPDATE, DELETE } from '../constants/actionTypes';

export default ( posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        
        case CREATE:
            return [...posts, action.payload];
        
        case FETCH_EVERY:
            return action.payload;

        case UPDATE:
            return posts.map((post) => post.id === action.payload.id ? action.payload : post);

        case DELETE:
            // keep the data that matches the condition inside the post
            return posts.filter((post) => post.id !== action.payload);

        default:
            return posts; 
    }
};