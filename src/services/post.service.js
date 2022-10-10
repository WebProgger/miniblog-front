import { httpHook } from "@/hooks/http.hook";

export const postService = () => {
    const { httpGet, httpPost, httpPatch, httpDelete } = httpHook();

    const getMyPosts = (id) => {
        return httpGet(`/posts?author=${id}`).then((response) => {
            return response;
        });
    }

    const getAnyPosts = (id) => {
        return httpGet(`/posts?page=1&no_author=${id}`).then((response) => {
            return response;
        });
    }

    const getLikedPosts = (id) => {
        return httpGet(`/posts?liked=${id}`).then((response) => {
            return response;
        });
    }

    const getFollowedPosts = (id) => {
        return httpGet(`/posts?followed=${id}`).then((response) => {
            return response;
        });
    }

    const getPosts = () => {
        return httpGet(`/posts`).then((response) => {
            return response;
        });
    }

    const getPost = (id) => {
        return httpGet(`/post/${id}`).then((response) => {
            return response;
        });
    }

    const createPost = (data) => {
        return httpPost("/post", data).then((response) => {
            return response;
        });
    }

    const editPost = (id, data) => {
        return httpPatch(`/post/${id}`, data).then((response) => {
            return response;
        });
    }

    const deletePost = (id) => {
        return httpDelete(`/post/${id}`).then((response) => {
            return response;
        });
    }

    const postLike = (id) => {
        return httpGet(`/post/${id}/like`).then((response) => {
            return response;
        });
    }

    const postUnLike = (id) => {
        return httpGet(`/post/${id}/unlike`).then((response) => {
            return response;
        });
    }

    return {
        getMyPosts,
        getAnyPosts,
        getLikedPosts,
        getFollowedPosts,
        getPosts,
        getPost,
        createPost,
        editPost,
        deletePost,
        postLike,
        postUnLike,
    }
}