import React, {useState} from 'react'
import {styled} from '@mui/material/styles';
import {useHistory, useParams} from "react-router-dom";
import {useDeletePostMutation, useGetPostQuery, useUpdatePostMutation,} from '../../services/posts';
import {Button, Grid, Paper, Slide, SlideProps, Stack,} from '@mui/material';
import PostJsonDetail from './PostJsonDetail';
import EditablePostName from "./EditPost";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function TransitionRight(props: JSX.IntrinsicAttributes & SlideProps) {
    return <Slide {...props} direction="right"/>;
}

export const PostDetail = () => {
    const {id} = useParams<{ id: any }>()
    const {push} = useHistory()

    // const toast = useToast()

    const [isEditing, setIsEditing] = useState(false)

    const {data: post, isLoading} = useGetPostQuery(id)

    const [updatePost, {isLoading: isUpdating}] = useUpdatePostMutation()

    const [deletePost, {isLoading: isDeleting}] = useDeletePostMutation()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!post) {
        return (
            <Stack spacing={4}>
                <h2>
                    Post {id} is missing! Try reloading or selecting another post...
                </h2>
            </Stack>
        )
    }

    return (
        <React.Fragment>
            {isEditing ? (
                <EditablePostName
                    name={post.name}
                    onUpdate={async (name) => {
                        try {
                            await updatePost({id, name}).unwrap()
                        } catch {

                        } finally {
                            setIsEditing(false)
                        }
                    }}
                    onCancel={() => setIsEditing(false)}
                    isLoading={isUpdating}
                />
            ) : (
                <Grid container spacing={6}>
                    <Grid item xs={6}>
                        <Item>{post.name}</Item>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            color="primary"
                            onClick={() => setIsEditing(true)}
                            disabled={isDeleting || isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Edit'}
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            color="warning"
                            onClick={() => deletePost(id).then(() => push('/posts'))}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </Grid>
                </Grid>
            )}
            <PostJsonDetail id={post.id}/>
        </React.Fragment>
    )
}
