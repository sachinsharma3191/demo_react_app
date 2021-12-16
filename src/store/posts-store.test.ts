import {setupApiStore} from "../test/storeTestSetup";

import fetchMock from "jest-fetch-mock";
import {postService} from "./posts-store";
import {post} from '../test/testData';

beforeEach((): void => {
    fetchMock.resetMocks();
});

describe("ListPosts", () => {
    test("successful response", () => {
        const storeRef = setupApiStore(postService,);
        fetchMock.mockResponse(JSON.stringify([post]));

        return storeRef.store
            .dispatch<any>(
                postService.endpoints.getPosts.initiate(undefined)
            )
            .then((action: any) => {
                const {status, data, isSuccess} = action;
                console.log(data);
                expect(status).toBe("fulfilled");
                expect(isSuccess).toBe(true);
                expect(data).toStrictEqual(post);
            });
    });
    test("unsuccessful response", () => {
        const storeRef = setupApiStore(postService,);

        fetchMock.mockReject(new Error("Internal Server Error"));

        return storeRef.store
            .dispatch<any>(
                postService.endpoints.getPosts.initiate(undefined)
            )
            .then((action: any) => {
                console.log(action);
                const {
                    status,
                    //error: {error},
                    isError,
                } = action;
                expect(status).toBe("rejected");
                expect(isError).toBe(true);
                //expect(error).toBe("Error: Internal Server Error");
            });
    });
});

