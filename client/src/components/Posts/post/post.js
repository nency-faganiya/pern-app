import React, {useState} from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './style';

import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

import '../../../firebaseConfig';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Post = ({post, setCurrentId}) => {

    const dispatch = useDispatch();    
    const classes = useStyles();

    const [Url, setUrl] = useState('');

      if (Url == null){
        return;
      }
    const storage = getStorage();
    const starsRef = ref(storage, `images/${post.image}`);

        // Get the download URL
        getDownloadURL(starsRef)
        .then((url) => {
            // Insert url into an <img> tag to "download"
            setUrl(url);
        })
        .catch((error) => {
            console.log(error);
        });


    let tags = [];
    try{
        if(post.tags.length > 2){
            tags = post.tags.split(',');
        }else{
            tags = post.tags;
        }
    }catch(err){
        console.log(err);
    }

    return ( 
        <Card className={classes.card}>
            {/* <CardMedia className={classes.media} image={post.image} title={post.title} /> */}
            <CardMedia className={classes.media} image={Url} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6' >{post.name}</Typography>
                <Typography variant='body2' >{moment(post.created_at).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={()=>{setCurrentId(post.id)}}>
                    <MoreHorizIcon fontSize='medium'></MoreHorizIcon>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary' >{tags.map( (tag) => `#${tag} `)}</Typography>
            </div>
            {/* <div className={classes.details}>
                <Typography variant='body2' color='textSecondary' >{`#${post.tags}`}</Typography>
            </div> */}
            <Typography className={classes.title} variant='h4'>{post.title}</Typography>
            <CardContent>
                <Typography  variant='h6' gutterBottom >{post.description}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={()=> dispatch(likePost(post.id)) }>
                    <ThumbUpAltIcon fontSize="small"></ThumbUpAltIcon>
                    &nbsp; Like &nbsp;
                    {post.likecount}
                </Button>
                <Button  size="small" color="primary" onClick={()=> dispatch(deletePost(post.id)) }>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;