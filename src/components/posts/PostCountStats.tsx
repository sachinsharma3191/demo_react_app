import {useGetPostsQuery} from "../../store/posts-store";
import {Grid} from "@mui/material";
import React from "react";


const PostsCountStat = () => {
    const {data: posts} = useGetPostsQuery()

    if (!posts) return null

    return (
        <Grid container spacing={2}>
            <Grid item xs={1}>Active Posts</Grid>
            <Grid item xs={1}>{posts?.length}</Grid>
        </Grid>
    )
}

export default PostsCountStat;