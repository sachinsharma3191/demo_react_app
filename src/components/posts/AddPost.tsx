import React, {useState} from "react";
import {Post, useAddPostMutation} from "../../services/posts";
import {Button, FormControl, FormLabel, Stack, TextField} from "@mui/material";


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

export default AddPost;