import React, {useState} from "react";
import { useAddPostMutation} from "../../store/posts-store";
import {Post} from '../../model/post'
import {Button, FormControl, FormLabel, IconButton, Snackbar, Stack, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const AddPost = () => {
    const initialValue = {name: ''}
    const [post, setPost] = useState<Pick<Post, 'name'>>(initialValue)
    const [addPost, {isLoading}] = useAddPostMutation()
    const [error, setError] = useState(false);
    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setPost((prev) => ({
            ...prev,
            [target.name]: target.value,
        }))
    }

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    const handleAddPost = async () => {
        try {
            if (post.name.length === 0) {
                alert("Please provide post name");
                setError(true);
                return
            } else {
                await addPost(post).unwrap()
                setPost(initialValue)
            }

        } catch {
            console.log("An error occured");
            setError(true);
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
                <div className="AddPosts-error">
                    {
                        error ?
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                                action={action}
                                message="Please enter post name"
                            /> : null
                    }
                </div>
            </FormControl>
        </Stack>
    )
}

export default AddPost;