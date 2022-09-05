const db = require("../db");

const getData = async (req, res, next) => {
    const results = await db.query("Select * from users");
    res.json(results.rows);
};

const addUser = async (req, res, next) => {
    let results;
    try{
        results = await db.query("INSERT INTO users (name, email, password, image, role) VALUES ($1, $2, $3, '', false) Returning *",
        [ req.body.name, req.body.email, req.body.password ]);
    }catch(err){
        console.log(err);
    }
    return res.json(results);
}

const login = async (req, res, next) => {
    token='test123';
    res.send({token});
    console.log("logged in");
    res.redirect()
}


exports.getData = getData;
exports.addUser = addUser;
exports.login = login;