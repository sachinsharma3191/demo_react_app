import {AppBar, Divider, Grid, Stack, Toolbar, Typography,} from '@mui/material'
import React from 'react';
import {Route, Switch} from 'react-router-dom'
import {PostDetail} from './posts/PostDetail';
import PostList from './posts/PostList';
import AddPost from "./posts/AddPost";
import PostsCountStat from "./posts/PostCountStats";
import "./PostsManager.css";


export const PostsManager = () => {
    return (
        <Stack>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Manage Posts
                    </Typography>
                    <PostsCountStat/>
                </Toolbar>
            </AppBar>
            <div className="AddPosts">
                <AddPost/>
                <Divider/>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <PostList/>
                </Grid>
                <Grid item xs={6}>
                    <Switch>
                        <Route path="/posts/:id" component={PostDetail}/>
                    </Switch>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default PostsManager;
