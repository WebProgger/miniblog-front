import {
    AUTH_FORGOT_PASSWORD_ERROR,
    AUTH_FORGOT_PASSWORD_REQUEST, AUTH_FORGOT_PASSWORD_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT_ERROR,
    AUTH_LOGOUT_LOCAL,
    AUTH_LOGOUT_REQUEST,
    AUTH_LOGOUT_SUCCESS,
    AUTH_REGISTER_ERROR,
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_SUCCESS, AUTH_RESET_PASSWORD_ERROR, AUTH_RESET_PASSWORD_REQUEST, AUTH_RESET_PASSWORD_SUCCESS
} from "@/store/actions/auth";
import { authService } from "@/services/auth.service";
import {STATUS_ERROR, STATUS_LOADING, STATUS_SUCCESS} from "@/store/actions/status";
import {USER_ME_REQUEST} from "@/store/actions/user";

export default {
    state: {
        status: "",
        token: localStorage.getItem("token") || "",
        user: localStorage.getItem("user" || ""),

        forgotEmail: localStorage.getItem("forgot-email" || ""),
        forgotToken: localStorage.getItem("forgot-token" || ""),
        forgotStatus: "",

        resetStatus: "",

        hasLoadedOnce: false
    },
    getters: {
        isAuthenticated: state => !!state.token,
        getUserMe: state => state.user,
        isAuthLoading: state => state.status === STATUS_LOADING,

        isForgotToken: state => state.forgotToken !== "",
        getForgotEmail: state => state.forgotEmail,
        getForgotToken: state => state.forgotToken,
    },
    mutations: {
        [AUTH_REGISTER_REQUEST]: state => {
            state.status = STATUS_LOADING;
        },
        [AUTH_REGISTER_SUCCESS]: (state, resp) => {
            state.status = STATUS_SUCCESS;
            state.token = resp.data.token;
            state.user = resp.data.id;
            state.hasLoadedOnce = true;
        },
        [AUTH_REGISTER_ERROR]: state => {
            state.status = STATUS_ERROR;
            state.hasLoadedOnce = false;
        },

        [AUTH_LOGIN_REQUEST]: state => {
            state.status = STATUS_LOADING;
        },
        [AUTH_LOGIN_SUCCESS]: (state, resp) => {
            state.status = STATUS_SUCCESS;
            state.token = resp.data.token;
            state.user = resp.data.id;
            state.hasLoadedOnce = true;
        },
        [AUTH_LOGIN_ERROR]: state => {
            state.status = STATUS_ERROR;
            state.hasLoadedOnce = false;
        },

        [AUTH_LOGOUT_REQUEST]: state => {
            state.status = STATUS_LOADING;
        },
        [AUTH_LOGOUT_LOCAL]: state => {
            state.token = "";
            state.user = "";
        },
        [AUTH_LOGOUT_SUCCESS]: state => {
            state.status = STATUS_SUCCESS;
        },
        [AUTH_LOGOUT_ERROR]: state => {
            state.status = STATUS_ERROR;
        },

        [AUTH_FORGOT_PASSWORD_REQUEST]: state => {
            state.forgotStatus = STATUS_LOADING;
        },
        [AUTH_FORGOT_PASSWORD_SUCCESS]: (state, resp) => {
            state.forgotStatus = STATUS_SUCCESS;
            state.forgotEmail = resp.data.email;
            state.forgotToken = resp.data.token;
        },
        [AUTH_FORGOT_PASSWORD_ERROR]: state => {
            state.forgotStatus = STATUS_ERROR;
        },

        [AUTH_RESET_PASSWORD_REQUEST]: state => {
            state.resetStatus = STATUS_LOADING;
        },
        [AUTH_RESET_PASSWORD_SUCCESS]: state => {
            state.resetStatus = STATUS_SUCCESS;
            state.resetEmail = "";
            state.resetToken = "";
        },
        [AUTH_RESET_PASSWORD_ERROR]: state => {
            state.resetStatus = STATUS_ERROR;
        },
    },
    actions: {
        [AUTH_REGISTER_REQUEST]: ({ commit, dispatch }, credentials) => {
            return new Promise((resolve, reject) => {
               commit(AUTH_REGISTER_REQUEST);
               authService().register(credentials).then(resp => {
                   localStorage.setItem("token", resp.data.token);
                   localStorage.setItem("user", resp.data.id);
                   commit(AUTH_REGISTER_SUCCESS, resp);
                   dispatch(USER_ME_REQUEST);
                   resolve(resp);
               }).catch(err => {
                   commit(AUTH_REGISTER_ERROR, err);
                   dispatch(AUTH_LOGOUT_LOCAL);
                   reject(err);
               })
            });
        },
        [AUTH_LOGIN_REQUEST]: ({ commit, dispatch }, credentials) => {
            return new Promise((resolve, reject) => {
                commit(AUTH_LOGIN_REQUEST);
                authService().login(credentials).then(resp => {
                    localStorage.setItem("token", resp.data.token);
                    localStorage.setItem("user", resp.data.id);
                    commit(AUTH_LOGIN_SUCCESS, resp);
                    dispatch(USER_ME_REQUEST);
                    resolve(resp);
                }).catch(err => {
                    commit(AUTH_LOGIN_ERROR, err);
                    dispatch(AUTH_LOGOUT_LOCAL);
                    reject(err);
                })
            });
        },
        [AUTH_LOGOUT_REQUEST]: ({ commit, dispatch }) => {
            return new Promise((resolve, reject) => {
                commit(AUTH_LOGOUT_REQUEST);
                authService().logout().then(resp => {
                    commit(AUTH_LOGOUT_SUCCESS, resp);
                    dispatch(AUTH_LOGOUT_LOCAL);
                    resolve(resp);
                }).catch(err => {
                    commit(AUTH_LOGOUT_ERROR, err);
                    reject(err);
                })
            });
        },
        [AUTH_LOGOUT_LOCAL]: ({ commit }) => {
            return new Promise(resolve => {
                commit(AUTH_LOGOUT_LOCAL);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                resolve();
            });
        },
        [AUTH_FORGOT_PASSWORD_REQUEST]: ({ commit }, credentials) => {
            return new Promise((resolve, reject) => {
                commit(AUTH_FORGOT_PASSWORD_REQUEST);
                authService().forgotPassword(credentials).then(resp => {
                    localStorage.setItem("forgot-email", credentials.email)
                    localStorage.setItem("forgot-token", resp.data.token);
                    resp.data.email = credentials.email;
                    commit(AUTH_FORGOT_PASSWORD_SUCCESS, resp);
                    resolve(resp);
                }).catch(err => {
                    commit(AUTH_FORGOT_PASSWORD_ERROR, err);
                    reject(err);
                })
            });
        },
        [AUTH_RESET_PASSWORD_REQUEST]: ({ commit }, credentials) => {
            return new Promise((resolve, reject) => {
                commit(AUTH_RESET_PASSWORD_REQUEST);
                authService().resetPassword(credentials).then(resp => {
                    localStorage.removeItem("forgot-email")
                    localStorage.removeItem("forgot-token");
                    commit(AUTH_RESET_PASSWORD_SUCCESS);
                    resolve(resp);
                }).catch(err => {
                    commit(AUTH_RESET_PASSWORD_ERROR, err);
                    reject(err);
                })
            });
        },
    },
}