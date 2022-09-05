import React,{ useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {createPosts} from '../../actions/posts';
import { useSelector } from 'react-redux';

import '../../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updatePost } from '../../api';

// GET THE CURRENT ID OF THE POST
const Form = ({currentId, setCurrentId}) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [img, setImg] = useState(null);

    const [postData, setPostData] = useState({
        title: '',
        description: '',
        tags: '',
        user_id: null,
        image: '',
    })

    const post = useSelector((state) => currentId ? state.posts.find((p) => p.id === currentId) : null);

    useEffect(() => {
        if(post){
            setPostData(post);
        }
    }, [post]);


    const onImageChange = (e) => {
        if(e.target.files[0]){
            setImg(e.target.files[0]);
        }
        setPostData({ ...postData, image: e.target.files[0].name});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(img) {
            const storage = getStorage();
            const imageRef = ref(storage, 'images/' + img.name);
            uploadBytesResumable(imageRef, img)
            .then((snapshot) => {
                console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                // console.log('File metadata:', snapshot.metadata);
                // Let's get a download URL for the file.
                getDownloadURL(snapshot.ref).then((url) => {
                console.log('File available at', url);
                // ...
                });
            }).catch((error) => {
                console.error('Upload failed', error);
                // ...
            });
        }
        if(currentId){
            dispatch(updatePost(currentId, postData));
            clear();
        }
        else{
            dispatch(createPosts(postData));
            clear();
        }
        clear();
    }

    const clear = () => {
        setCurrentId(0);
        setPostData({
            title: '',
            description: '',
            tags: '',
            user_id: null,
            image: ''
        })
    }

    return ( 
        <>
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography varaint="h6">{currentId ? 'Editing' : 'Creating'} a post</Typography>
                <TextField 
                    name="title" 
                    varaint="outlined" 
                    label="title" 
                    fullWidth
                    value={postData.title}
                    // all other data will persists, only last data will change
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}    
                />
                <TextField 
                    name="description"
                    varaint="outlined" 
                    label="description" 
                    fullWidth
                    value={postData.description}
                    // all other data will persists, only last data will change
                    onChange={(e) => setPostData({ ...postData, description: e.target.value })}    
                />
                <TextField 
                    name="tags" 
                    varaint="outlined" 
                    label="tags" 
                    fullWidth
                    value={postData.tags}
                    // all other data will persists, only last data will change
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value})}    
                />
                <div>
                <input type="file" multiple accept={".png, .jpg, .jpeg"} onChange={onImageChange} />
                </div>
                <TextField 
                    name="creator" 
                    varaint="outlined" 
                    label="Creator" 
                    fullWidth
                    value={postData.user_id}
                    // all other data will persists, only last data will change
                    onChange={(e) => setPostData({ ...postData, user_id: e.target.value })}    
                />
                <Button className={classes.buttonSubmit} varaint="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button varaint="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
        </>
    );
}

export default Form;