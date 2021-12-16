import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Post} from '../model/post';

type PostsResponse = Post[]

export const BASE_URL = "http://localhost:3000"

export const postService = createApi({
    reducerPath: "postsService",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        getPosts: build.query<PostsResponse, void>({
            query: () => 'posts',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: 'Post' as const, id})),
                        {type: 'Post', id: 'LIST'},
                    ]
                    : [{type: 'Post', id: 'LIST'}],
        }),
        addPost: build.mutation<Post, Partial<Post>>({
            query: (body) => ({
                url: `posts`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Post', id: 'LIST'}],
        }),
        getPost: build.query<Post, string>({
            query: (id) => `posts/${id}`,
            providesTags: (result, error, id) => [{type: 'Post', id}],
        }),
        updatePost: build.mutation<void, Pick<Post, 'id'> & Partial<Post>>({
            query: ({id, ...patch}) => ({
                url: `posts/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (result, error, {id}) => [{type: 'Post', id}],
        }),
        deletePost: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `posts/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, id) => [{type: 'Post', id}],
        }),
    }),
})

export const {
    useGetPostQuery,
    useGetPostsQuery,
    useAddPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postService
