require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users-routes');
const postsRouter = require('./routes/posts-routes');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  });


app.use('/posts', postsRouter);
app.use('/user', usersRouter);

app.listen(process.env.PORT || 3005, () => {
    console.log(`server is listing on port ${process.env.PORT}.`);
});