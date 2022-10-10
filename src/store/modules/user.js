import {
    AUTH_LOGOUT_LOCAL,
} from "@/store/actions/auth";
import {
    USER_ERROR,
    USER_FOLLOW_ERROR,
    USER_FOLLOW_REQUEST,
    USER_FOLLOW_SUCCESS,
    USER_FOLLOWERS_ERROR,
    USER_FOLLOWERS_REQUEST,
    USER_FOLLOWERS_SUCCESS,
    USER_FOLLOWS_ERROR,
    USER_FOLLOWS_REQUEST,
    USER_FOLLOWS_SUCCESS,
    USER_ISFOLLOWED_ERROR, USER_ISFOLLOWED_REQUEST,
    USER_ISFOLLOWED_SUCCESS,
    USER_ME_ERROR,
    USER_ME_REQUEST,
    USER_ME_SUCCESS,
    USER_REQUEST, USER_SETTINGS_ERROR, USER_SETTINGS_REQUEST, USER_SETTINGS_SUCCESS,
    USER_SUCCESS,
    USER_UNFOLLOW_ERROR,
    USER_UNFOLLOW_REQUEST,
    USER_UNFOLLOW_SUCCESS,
} from "@/store/actions/user";
import Vue from "vue";
import { userService } from "@/services/user.service";
import {STATUS_ERROR, STATUS_LOADING, STATUS_SUCCESS} from "@/store/actions/status";
import router from "@/router";


export default {
    state: {
        userMeStatus: "",
        profile: {},

        userSettingsStatus: "",

        userStatus: "",
        user: {},

        usersStatus: "",
        users: [],

        followsStatus: "",
        followsCount: 0,
        follows: [],

        isFollowedStatus: "",
        isFollowed: false,

        followersStatus: "",
        followersCount: 0,
        followers: [],

        followStatus: "",
        unFollowStatus: "",
    },
    getters: {
        getProfile: state => state.profile,
        getProfileId: state => state.profile.id,
        isProfileLoading: state => state.userMeStatus === STATUS_LOADING,
        isProfileLoadedSuccess: state => state.userMeStatus === STATUS_SUCCESS,
        isProfileLoadedError: state => state.userMeStatus === STATUS_ERROR,

        getUser: state => state.user,
        isUserLoading: state => state.userStatus === STATUS_LOADING,
        isUserLoadedSuccess: state => state.userStatus === STATUS_SUCCESS,
        isUserLoadedError: state => state.userStatus === STATUS_ERROR,

        getFollowsCount: state => state.followsCount,
        getFollows: state => state.follows,
        isFollowsLoading: state => state.followsStatus === STATUS_LOADING,
        isFollowsLoadedSuccess: state => state.followsStatus === STATUS_SUCCESS,
        isFollowsLoadedError: state => state.followsStatus === STATUS_ERROR,

        getFollowersCount: state => state.followersCount,
        getFollowers: state => state.followers,
        isFollowersLoading: state => state.followersStatus === STATUS_LOADING,
        isFollowersLoadedSuccess: state => state.followersStatus === STATUS_SUCCESS,
        isFollowersLoadedError: state => state.followersStatus === STATUS_ERROR,

        isFollowedLoading: state => state.isFollowedStatus === STATUS_LOADING,
        isFollowed: state => state.isFollowed,

        isFollowLoading: state => state.followStatus === STATUS_LOADING,
        isUnFollowLoading: state => state.unFollowStatus === STATUS_LOADING,
    },
    mutations: {
        [USER_ME_REQUEST]: state => {
            state.userMeStatus = STATUS_LOADING;
        },
        [USER_ME_SUCCESS]: (state, resp) => {
            state.userMeStatus = STATUS_SUCCESS;
            Vue.set(state, "profile", resp);
        },
        [USER_ME_ERROR]: state => {
            state.userMeStatus = STATUS_ERROR;
        },

        [USER_SETTINGS_REQUEST]: state => {
            state.userSettingsStatus = STATUS_LOADING;
        },
        [USER_SETTINGS_SUCCESS]: state => {
            state.userSettingsStatus = STATUS_SUCCESS;
        },
        [USER_SETTINGS_ERROR]: state => {
            state.userSettingsStatus = STATUS_ERROR;
        },

        [USER_REQUEST]: state => {
            state.userStatus = STATUS_LOADING;
        },
        [USER_SUCCESS]: (state, resp) => {
            state.userStatus = STATUS_SUCCESS;
            Vue.set(state, "user", resp);
        },
        [USER_ERROR]: state => {
            state.userStatus = STATUS_ERROR;
        },

        [USER_FOLLOWS_REQUEST]: state => {
            state.followsStatus = STATUS_LOADING;
        },
        [USER_FOLLOWS_SUCCESS]: (state, resp) => {
            state.followsStatus = STATUS_SUCCESS;
            state.followsCount = resp.data.count;
            state.follows = resp.data.follows;
        },
        [USER_FOLLOWS_ERROR]: state => {
            state.followsStatus = STATUS_ERROR;
        },

        [USER_FOLLOWERS_REQUEST]: state => {
            state.followersStatus = STATUS_LOADING;
        },
        [USER_FOLLOWERS_SUCCESS]: (state, resp) => {
            state.followersStatus = STATUS_SUCCESS;
            state.followersCount = resp.data.count;
            state.followers = resp.data.followers;
        },
        [USER_FOLLOWERS_ERROR]: state => {
            state.followersStatus = STATUS_ERROR;
        },

        [USER_ISFOLLOWED_REQUEST]: state => {
            state.isFollowedStatus = STATUS_LOADING;
        },
        [USER_ISFOLLOWED_SUCCESS]: (state, resp) => {
            state.isFollowedStatus = STATUS_SUCCESS;
            state.isFollowed = resp.data.followed;
        },
        [USER_ISFOLLOWED_ERROR]: state => {
            state.isFollowedStatus = STATUS_ERROR;
        },

        [USER_FOLLOW_REQUEST]: state => {
            state.followStatus = STATUS_LOADING;
        },
        [USER_FOLLOW_SUCCESS]: state => {
            state.followStatus = STATUS_SUCCESS;
        },
        [USER_FOLLOW_ERROR]: state => {
            state.followStatus = STATUS_ERROR;
        },

        [USER_UNFOLLOW_REQUEST]: state => {
            state.unFollowStatus = STATUS_LOADING;
        },
        [USER_UNFOLLOW_SUCCESS]: state => {
            state.unFollowStatus = STATUS_SUCCESS;
        },
        [USER_UNFOLLOW_ERROR]: state => {
            state.unFollowStatus = STATUS_ERROR;
        },

        [AUTH_LOGOUT_LOCAL]: state => {
            state.profile = {}
        }
    },
    actions: {
        [USER_ME_REQUEST]: ({ commit, dispatch }) => {
            commit(USER_ME_REQUEST);
            userService().me().then(resp => {
                commit(USER_ME_SUCCESS, resp.data);
            }).catch(() => {
                commit(USER_ME_ERROR);
                dispatch(AUTH_LOGOUT_LOCAL);
            });
        },

        [USER_REQUEST]: ({ commit }, payload) => {
            commit(USER_REQUEST);
            userService().getUser(payload.userId).then(resp => {
                commit(USER_SUCCESS, resp.data);
            }).catch(() => {
                commit(USER_ERROR);
            });
        },

        [USER_FOLLOWS_REQUEST]: ({ commit }, payload) => {
            commit(USER_FOLLOWS_REQUEST);
            userService().getFollows(payload.userId).then(resp => {
                commit(USER_FOLLOWS_SUCCESS, resp)
            }).catch(() => {
                commit(USER_FOLLOWS_ERROR);
            });
        },

        [USER_FOLLOWERS_REQUEST]: ({ commit }, payload) => {
            commit(USER_FOLLOWERS_REQUEST);
            userService().getFollowers(payload.userId).then(resp => {
                commit(USER_FOLLOWERS_SUCCESS, resp)
            }).catch(() => {
                commit(USER_FOLLOWERS_ERROR);
            });
        },

        [USER_ISFOLLOWED_REQUEST]: ({ commit }, payload) => {
            commit(USER_ISFOLLOWED_REQUEST);
            userService().isFollowed(payload.userId).then(resp => {
                commit(USER_ISFOLLOWED_SUCCESS, resp)
            }).catch(() => {
                commit(USER_ISFOLLOWED_ERROR);
            });
        },

        [USER_FOLLOW_REQUEST]: ({ commit, dispatch }, payload) => {
            commit(USER_FOLLOW_REQUEST);
            userService().follow(payload.userId).then(() => {
                commit(USER_FOLLOW_SUCCESS)
                dispatch(USER_ISFOLLOWED_REQUEST, payload);
            }).catch(() => {
                router.push("/login");
                commit(USER_FOLLOW_ERROR);
            });
        },

        [USER_UNFOLLOW_REQUEST]: ({ commit, dispatch }, payload) => {
            commit(USER_UNFOLLOW_REQUEST);
            userService().unFollow(payload.userId).then(() => {
                commit(USER_UNFOLLOW_SUCCESS)
                dispatch(USER_ISFOLLOWED_REQUEST, payload);
            }).catch(() => {
                router.push("/login");
                commit(USER_UNFOLLOW_ERROR);
            });
        },

        [USER_SETTINGS_REQUEST]: ({ commit, dispatch }, credentials) => {
            return new Promise((resolve, reject) => {
                commit(USER_SETTINGS_REQUEST);
                userService().userSettings(credentials).then(resp => {
                    commit(USER_SETTINGS_SUCCESS);
                    dispatch(USER_ME_REQUEST);
                    resolve(resp);
                }).catch(err => {
                    commit(USER_SETTINGS_ERROR);
                    reject(err);
                })
            });
        },
    },
}