import {
    AppBar,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    List,
    ListItem,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material'
import React, {useState} from 'react';
import {Link, Route, Switch, useHistory} from 'react-router-dom'
import {Post, useAddPostMutation, useGetPostsQuery,} from '../services/posts';
import {PostDetail} from './posts/PostDetail';
import "./PostsManager.css";


const AddPost = () => {
    const initialValue = {name: ''}
    const [post, setPost] = useState<Pick<Post, 'name'>>(initialValue)
    const [addPost, {isLoading}] = useAddPostMutation()

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setPost((prev) => ({
            ...prev,
            [target.name]: target.value,
        }))
    }

    const handleAddPost = async () => {
        try {
            await addPost(post).unwrap()
            setPost(initialValue)
        } catch {
            console.log("An error occured");
        }
    }

    return (
        <Stack
            direction="row-reverse"
            justifyContent="space-evenly"
            alignItems="stretch"
            spacing={8}
        >
            <FormControl>
                <div className="AddPosts-post">
                    <FormLabel htmlFor="name">Post name</FormLabel>
                </div>
                <div className="AddPosts-name">
                    <TextField
                        name="name"
                        placeholder="Enter post name"
                        value={post.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="AddPosts-submit">
                    <Button variant="contained"
                            color="primary"
                            onClick={handleAddPost}
                    >
                        Add Post
                    </Button>
                </div>

            </FormControl>
        </Stack>
    )
}

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

export const PostsCountStat = () => {
    const {data: posts} = useGetPostsQuery()

    if (!posts) return null

    return (
        <Grid container spacing={2}>
            <Grid item xs={1}>Active Posts</Grid>
            <Grid item xs={1}>{posts?.length}</Grid>
        </Grid>
    )
}

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
