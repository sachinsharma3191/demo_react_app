import {useGetPostQuery} from "../../services/posts";
import {Box} from "@mui/material";
import React from "react";


const PostJsonDetail = ({id}: { id: string }) => {
    const {data: post} = useGetPostQuery(id)

    return (
        <Box sx={{
            width: 300,
            height: 300,
            backgroundColor: 'primary.dark',
            '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
            },
        }}>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </Box>
    )
}

export default PostJsonDetail;