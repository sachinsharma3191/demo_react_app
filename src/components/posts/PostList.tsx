import {useGetPostsQuery} from "../../services/posts";
import {Link, useHistory} from "react-router-dom";
import {List, ListItem, Typography} from "@mui/material";
import React from "react";


const PostList = () => {
    const {data: posts, isLoading} = useGetPostsQuery()
    const {push} = useHistory()

    if (isLoading) {
        return <div>Loading</div>
    }

    if (!posts) {
        return <div>No posts :(</div>
    }

    return (
        <div className="ListPosts-all">
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Post List
            </Typography>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {posts.map(({id, name}) => (
                    <ListItem key={id} onClick={() => push(`/posts/${id}`)}>
                        <Link to="`/posts/${id}`">{name}</Link>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default PostList;