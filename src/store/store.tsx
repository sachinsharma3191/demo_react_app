import {configureStore} from '@reduxjs/toolkit'
import {postService} from './posts-store';

export const store = configureStore({
    reducer: {
        [postService.reducerPath]: postService.reducer,
    },
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postService.middleware),
})
