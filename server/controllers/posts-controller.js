const db = require("../db");

const getPosts = async (req, res) => {
    let results;
    try{
        // console.log("request reached at get post", req.body);
        results = await db.query("SELECT * FROM post");
        res.status(200).json(results.rows);
    }catch(err){
        console.log(err);
    }
}

const createPost = async (req, res) => {
    // console.log("create request reached", req.body);
    let values = [ 
        req.body.title, 
        req.body.description,
        req.body.image,
        req.body.user_id,
        req.body.tags
    ]
    let newPost;
    try{
        newPost = await db.query(`INSERT INTO post ( title, description, image, user_id, tags, likecount, created_at, updated_at ) VALUES ($1, $2, $3, $4, $5, 0, now(), now())`, values);
        res.status(201).json(newPost);
    }catch(err){
        res.status(409).json({message: err.message});
    }
}

const getEvery = async (req, res, next) => {
    let results;
    try{
        results = await db.query("SELECT users.name, post.id, post.user_id, post.title, post.description, post.tags, post.image, post.likeCount, post.created_at from users join post on users.id = post.user_id;");
        res.status(200).json(results.rows);
    }catch(err){
        console.log(err);
    }
}

const updatePost = async (req, res, next) => {
    // console.log(updatedPost);
    let values = [ 
        req.body.title, 
        req.body.description,
        req.body.tags,
        req.body.image,
        req.body.user_id,
        req.params.id // post id for updating
    ]
    let results;
    if(!req.params.id){
        res.status(404).json("invalid id");
    }else{
        try{
            results = await db.query("UPDATE post SET title=$1, description=$2, tags=$3, image=$4, user_id=$5, updated_at=now() WHERE id=$6 Returning *", values);
            res.status(200).json(results.rows);
        }catch(err){
            console.log(err);
        }
    }
}

const deletePost = async (req, res, next) => {
    let id = req.params.id;
    let results;
    console.log("delete post controller is called");
    if(!id){
        res.status(404).json("invalid id");
    }else{
        try{
            results = await db.query("DELETE FROM post WHERE id=$1",[id]);
            res.status(200).json(results.rows);
        }catch(err){
            console.log(err);
        }
    }
}

const likePost = async (req, res, next) => {
    let like;
    let totalLike;
    let id=req.params.id;
    try{
        like = await db.query("SELECT likeCount FROM post WHERE id=$1", [id]);
        totalLike = like.rows[0].likecount;
        await db.query("UPDATE post SET likecount=$1 WHERE id=$2", [likecount= Number(totalLike) + 1, id]);
        // res.status(200).json(results.rows);
    }catch(err){
        console.log(err);
    }
}

exports.getPosts = getPosts;
exports.createPost = createPost;
exports.getEvery = getEvery;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.likePost = likePost;