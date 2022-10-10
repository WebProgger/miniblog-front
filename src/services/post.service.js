import { httpHook } from "@/hooks/http.hook";

export const postService = () => {
    const { httpGet, httpPost, httpPatch, httpDelete } = httpHook();

    const getMyPosts = (page, id) => {
        return httpGet(`/posts?page=${page}&author=${id}`).then((response) => {
            return response;
        });
    }

    const getAnyPosts = (page, id) => {
        return httpGet(`/posts?page=${page}&no_author=${id}`).then((response) => {
            return response;
        });
    }

    const getLikedPosts = (page, id) => {
        return httpGet(`/posts?page=${page}&liked=${id}`).then((response) => {
            return response;
        });
    }

    const getFollowedPosts = (page, id) => {
        return httpGet(`/posts?page=${page}&followed=${id}`).then((response) => {
            return response;
        });
    }

    const getPosts = (page) => {
        return httpGet(`/posts?page=${page}`).then((response) => {
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