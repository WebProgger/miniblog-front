import {
    MODAL_HIDE,
    MODAL_SHOW,
    OPEN_CREATE_POST_MODAL,
    OPEN_DELETE_POST_MODAL,
    OPEN_EDIT_POST_MODAL
} from "@/store/actions/modal";

export default {
    state: {
        show: false,

        openCreatePostModal: false,
        openEditPostModal: false,
        openDeletePostModal: false,
    },
    getters: {
        isModalShow: state => state.show,

        isOpenCreatePostModal: state => state.openCreatePostModal,
        isOpenEditPostModal: state => state.openEditPostModal,
        isOpenDeletePostModal: state => state.openDeletePostModal,
    },
    mutations: {
        [MODAL_SHOW]: state => {
            state.show = true;
        },
        [MODAL_HIDE]: state => {
            state.show = false;
        },

        [OPEN_CREATE_POST_MODAL]: (state, payload) => {
            state.openCreatePostModal = payload;
        },
        [OPEN_EDIT_POST_MODAL]: (state, payload) => {
            state.openEditPostModal = payload;
        },
        [OPEN_DELETE_POST_MODAL]: (state, payload) => {
            state.openDeletePostModal = payload;
        },
    },
    actions: {
        [MODAL_SHOW]: ({ commit }) => {
            commit(MODAL_SHOW);
        },
        [MODAL_HIDE]: ({ commit }) => {
            commit(MODAL_HIDE);
        },

        [OPEN_CREATE_POST_MODAL]: ({ commit }, payload) => {
            commit(OPEN_CREATE_POST_MODAL, payload);
        },
        [OPEN_EDIT_POST_MODAL]: ({ commit }, payload) => {
            commit(OPEN_EDIT_POST_MODAL, payload);
        },
        [OPEN_DELETE_POST_MODAL]: ({ commit }, payload) => {
            commit(OPEN_DELETE_POST_MODAL, payload);
        },
    },
}