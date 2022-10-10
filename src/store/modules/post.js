import {
    CREATE_POST_ERROR,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS, DELETE_POST_ERROR,
    DELETE_POST_REQUEST, DELETE_POST_SUCCESS,
    EDIT_POST_ERROR,
    EDIT_POST_REQUEST,
    EDIT_POST_SUCCESS,
    GET_ANY_POSTS_ERROR,
    GET_ANY_POSTS_REQUEST,
    GET_ANY_POSTS_SUCCESS,
    GET_FOLLOWED_POSTS_ERROR,
    GET_FOLLOWED_POSTS_REQUEST,
    GET_FOLLOWED_POSTS_SUCCESS,
    GET_LIKED_POSTS_ERROR,
    GET_LIKED_POSTS_REQUEST,
    GET_LIKED_POSTS_SUCCESS,
    GET_MY_POSTS_ERROR,
    GET_MY_POSTS_REQUEST,
    GET_MY_POSTS_SUCCESS,
    GET_POST_ERROR,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POSTS_ERROR,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    POST_LIKE_ERROR,
    POST_LIKE_REQUEST,
    POST_LIKE_SUCCESS,
    POST_UNLIKE_ERROR,
    POST_UNLIKE_REQUEST,
    POST_UNLIKE_SUCCESS
} from "@/store/actions/post";
import {postService} from "@/services/post.service";
import {STATUS_ERROR, STATUS_LOADING, STATUS_SUCCESS} from "@/store/actions/status";
import router from "@/router";

export default {
    state: {
        postsStatus: "",
        posts: [],

        myPostsStatus: "",
        myPosts: [],

        anyPostsStatus: "",
        anyPosts: [],

        likedPostsStatus: "",
        likedPosts: [],

        followedPostsStatus: "",
        followedPosts: [],

        postStatus: "",
        post: {
            id: '',
            title: '',
            text: '',
            author: {
                id: 0,
                full_name: '',
            },
            likes_count: 0,
            likes: [],
            views: '',
            updated_at: '',
        },

        createPostStatus: "",

        editPostStatus: "",

        deletePostStatus: "",

        postLikeStatus: "",
        postUnLikeStatus: "",
    },
    getters: {
        isPostsLoading: state => state.postsStatus === STATUS_LOADING,
        isNotPosts: state => state.posts.length < 1,
        getPosts: state => state.posts,

        isMyPostsLoading: state => state.myPostsStatus === STATUS_LOADING,
        isNotMyPosts: state => state.myPosts.length < 1,
        getMyPosts: state => state.myPosts,

        isAnyPostsLoading: state => state.anyPostsStatus === STATUS_LOADING,
        isNotAnyPosts: state => state.anyPosts.length < 1,
        getAnyPosts: state => state.anyPosts,

        isLikedPostsLoading: state => state.likedPostsStatus === STATUS_LOADING,
        isNotLikedPosts: state => state.likedPosts.length < 1,
        getLikedPosts: state => state.likedPosts,

        isPostLoading: state => state.postStatus === STATUS_LOADING,
        getPost: state => state.post,

        isFollowedPostsLoading: state => state.followedPostsStatus === STATUS_LOADING,
        isNotFollowedPosts: state => state.followedPosts.length < 1,
        getFollowedPosts: state => state.followedPosts,
    },
    mutations: {
        [GET_MY_POSTS_REQUEST]: (state) => {
            state.myPostsStatus = STATUS_LOADING;
        },
        [GET_MY_POSTS_SUCCESS]: (state, resp) => {
            state.myPostsStatus = STATUS_SUCCESS;
            state.myPosts = resp.data;
        },
        [GET_MY_POSTS_ERROR]: (state) => {
            state.myPostsStatus = STATUS_ERROR;
            state.myPosts = []
        },

        [GET_ANY_POSTS_REQUEST]: (state) => {
            state.anyPostsStatus = STATUS_LOADING;
        },
        [GET_ANY_POSTS_SUCCESS]: (state, resp) => {
            state.anyPostsStatus = STATUS_SUCCESS;
            state.anyPosts = resp.data;
        },
        [GET_ANY_POSTS_ERROR]: (state) => {
            state.anyPostsStatus = STATUS_ERROR;
            state.anyPosts = [];
        },

        [GET_LIKED_POSTS_REQUEST]: (state) => {
            state.likedPostsStatus = STATUS_LOADING;
        },
        [GET_LIKED_POSTS_SUCCESS]: (state, resp) => {
            state.likedPostsStatus = STATUS_SUCCESS;
            state.likedPosts = resp.data;
        },
        [GET_LIKED_POSTS_ERROR]: (state) => {
            state.likedPostsStatus = STATUS_ERROR;
            state.likedPosts = [];
        },

        [GET_FOLLOWED_POSTS_REQUEST]: (state) => {
            state.followedPostsStatus = STATUS_LOADING;
        },
        [GET_FOLLOWED_POSTS_SUCCESS]: (state, resp) => {
            state.followedPostsStatus = STATUS_SUCCESS;
            state.followedPosts = resp.data;
        },
        [GET_FOLLOWED_POSTS_ERROR]: (state) => {
            state.followedPostsStatus = STATUS_ERROR;
            state.followedPosts = [];
        },

        [GET_POSTS_REQUEST]: (state) => {
            state.postsStatus = STATUS_LOADING;
        },
        [GET_POSTS_SUCCESS]: (state, resp) => {
            state.postsStatus = STATUS_SUCCESS;
            state.posts = resp.data;
        },
        [GET_POSTS_ERROR]: (state) => {
            state.postsStatus = STATUS_ERROR;
            state.posts = [];
        },

        [GET_POST_REQUEST]: (state) => {
            state.postStatus = STATUS_LOADING;
        },
        [GET_POST_SUCCESS]: (state, resp) => {
            state.postStatus = STATUS_SUCCESS;
            state.post = resp.data;
        },
        [GET_POST_ERROR]: (state) => {
            state.postStatus = STATUS_ERROR;
            state.post = {};
        },

        [CREATE_POST_REQUEST]: (state) => {
            state.createPostStatus = STATUS_LOADING;
        },
        [CREATE_POST_SUCCESS]: (state) => {
            state.createPostStatus = STATUS_SUCCESS;
        },
        [CREATE_POST_ERROR]: (state) => {
            state.createPostStatus = STATUS_ERROR;
        },

        [EDIT_POST_REQUEST]: (state) => {
            state.editPostStatus = STATUS_LOADING;
        },
        [EDIT_POST_SUCCESS]: (state) => {
            state.editPostStatus = STATUS_SUCCESS;
        },
        [EDIT_POST_ERROR]: (state) => {
            state.editPostStatus = STATUS_ERROR;
        },

        [DELETE_POST_REQUEST]: (state) => {
            state.deletePostStatus = STATUS_LOADING;
        },
        [DELETE_POST_SUCCESS]: (state) => {
            state.deletePostStatus = STATUS_SUCCESS;
        },
        [DELETE_POST_ERROR]: (state) => {
            state.deletePostStatus = STATUS_ERROR;
        },

        [POST_LIKE_REQUEST]: (state) => {
            state.postLikeStatus = STATUS_LOADING;
        },
        [POST_LIKE_SUCCESS]: (state) => {
            state.postLikeStatus = STATUS_SUCCESS;
        },
        [POST_LIKE_ERROR]: (state) => {
            state.postLikeStatus = STATUS_ERROR;
        },

        [POST_UNLIKE_REQUEST]: (state) => {
            state.postUnLikeStatus = STATUS_LOADING;
        },
        [POST_UNLIKE_SUCCESS]: (state) => {
            state.postUnLikeStatus = STATUS_SUCCESS;
        },
        [POST_UNLIKE_ERROR]: (state) => {
            state.postUnLikeStatus = STATUS_ERROR;
        },
    },
    actions: {
        [GET_MY_POSTS_REQUEST]: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit(GET_MY_POSTS_REQUEST);
                postService().getMyPosts(payload).then(resp => {
                    commit(GET_MY_POSTS_SUCCESS, resp.data);
                    resolve(resp);
                }).catch(err => {
                    commit(GET_MY_POSTS_ERROR, err);
                    reject(err);
                })
            });
        },

        [GET_ANY_POSTS_REQUEST]: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit(GET_ANY_POSTS_REQUEST);
                postService().getAnyPosts(payload).then(resp => {
                    commit(GET_ANY_POSTS_SUCCESS, resp.data);
                    resolve(resp);
                }).catch(err => {
                    commit(GET_ANY_POSTS_ERROR, err);
                    reject(err);
                })
            });
        },

        [GET_LIKED_POSTS_REQUEST]: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit(GET_LIKED_POSTS_REQUEST);
                postService().getLikedPosts(payload).then(resp => {
                    commit(GET_LIKED_POSTS_SUCCESS, resp.data);
                    resolve(resp);
                }).catch(err => {
                    commit(GET_LIKED_POSTS_ERROR, err);
                    reject(err);
                })
            });
        },

        [GET_FOLLOWED_POSTS_REQUEST]: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit(GET_FOLLOWED_POSTS_REQUEST);
                postService().getFollowedPosts(payload).then(resp => {
                    commit(GET_FOLLOWED_POSTS_SUCCESS, resp.data);
                    resolve(resp);
                }).catch(err => {
                    commit(GET_FOLLOWED_POSTS_ERROR, err);
                    reject(err);
                })
            });
        },

        [GET_POSTS_REQUEST]: ({ commit }) => {
            return new Promise((resolve, reject) => {
                commit(GET_POSTS_REQUEST);
                postService().getPosts().then(resp => {
                    commit(GET_POSTS_SUCCESS, resp.data);
                    resolve(resp);
                }).catch(err => {
                    commit(GET_POSTS_ERROR, err);
                    reject(err);
                })
            });
        },

        [GET_POST_REQUEST]: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit(GET_POST_REQUEST);
                postService().getPost(payload).then(resp => {
                    commit(GET_POST_SUCCESS, resp);
                    resolve(resp);
                }).catch(err => {
                    commit(GET_POST_ERROR, err);
                    reject(err);
                })
            });
        },

        [CREATE_POST_REQUEST]: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit(CREATE_POST_REQUEST);
                postService().createPost(payload).then(resp => {
                    commit(CREATE_POST_SUCCESS);
                    //dispatch(GET_MY_POSTS_REQUEST, payload.author);
                    resolve(resp);
                }).catch(err => {
                    commit(CREATE_POST_ERROR);
                    reject(err);
                })
            });
        },

        [EDIT_POST_REQUEST]: ({ commit, dispatch }, payload) => {
            return new Promise((resolve, reject) => {
                commit(EDIT_POST_REQUEST);
                postService().editPost(payload.id, payload).then(resp => {
                    commit(EDIT_POST_SUCCESS);
                    dispatch(GET_MY_POSTS_REQUEST, payload.author);
                    resolve(resp);
                }).catch(err => {
                    commit(EDIT_POST_ERROR);
                    reject(err);
                })
            });
        },

        [DELETE_POST_REQUEST]: ({ commit, dispatch }, payload) => {
            return new Promise((resolve, reject) => {
                commit(DELETE_POST_REQUEST);
                postService().deletePost(payload).then(resp => {
                    commit(DELETE_POST_SUCCESS);
                    dispatch(GET_MY_POSTS_REQUEST, payload.author);
                    resolve(resp);
                }).catch(err => {
                    commit(DELETE_POST_ERROR);
                    reject(err);
                })
            });
        },

        [POST_LIKE_REQUEST]: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit(POST_LIKE_REQUEST);
                postService().postLike(payload).then(resp => {
                    commit(POST_LIKE_SUCCESS);
                    /*
                    dispatch(GET_MY_POSTS_REQUEST, store.getters.getUserMe);
                    dispatch(GET_ANY_POSTS_REQUEST, store.getters.getUserMe);
                    dispatch(GET_POSTS_REQUEST);
                    dispatch(GET_LIKED_POSTS_REQUEST, store.getters.getUserMe);

                     */
                    resolve(resp);
                }).catch(err => {
                    commit(POST_LIKE_ERROR);
                    router.push("/login");
                    reject(err);
                })
            });
        },
        [POST_UNLIKE_REQUEST]: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit(POST_UNLIKE_REQUEST);
                postService().postUnLike(payload).then(resp => {
                    commit(POST_UNLIKE_SUCCESS);
                    /*
                    dispatch(GET_MY_POSTS_REQUEST, store.getters.getUserMe);
                    dispatch(GET_ANY_POSTS_REQUEST, store.getters.getUserMe);
                    dispatch(GET_POSTS_REQUEST);
                    dispatch(GET_LIKED_POSTS_REQUEST, store.getters.getUserMe);

                     */
                    resolve(resp);
                }).catch(err => {
                    commit(POST_UNLIKE_ERROR);
                    router.push("/login");
                    reject(err);
                })
            });
        },
    },
}