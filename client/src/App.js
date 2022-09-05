import React, { useEffect, useState } from 'react';
// import React, {Component} from 'react';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
// import Signup from "./components/signup/Signup";
// import Login from "./components/login/Login";
// import Dashboard from "./components/dashboard/Dashboard";

import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts, getAllData } from './actions/posts.js';

import Form from './components/Form/form';
import Posts from './components/Posts/posts';
import memories from './images/memories.png';
import useStyles from './styles';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        // dispatch the action
        dispatch(getAllData());
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
    //     <div>
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path="/signup" caseSensitive={false} element={<Signup />} />
    //         <Route path="/login" caseSensitive={false} element={<Login />} />
    //         <Route path="/dashboard" caseSensitive={false} element={<Dashboard />} />
    //         <Route path="/" caseSensitive={false} element={<Home />} />
    //       </Routes>
    //     </BrowserRouter>
    //   </div>

    <Container maxwidth='lg'>
        <AppBar className={classes.appBar} position="static" color="inherit" >
            <Typography varaint="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60" />
        </AppBar>
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    </Container>

    );
}

export default App;