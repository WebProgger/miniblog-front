import { REQUEST_LOADING } from "@/store/actions/http";

export default {
    state: {
        loading: false
    },
    getters: {
        isLoading: state => state.loading,
    },
    mutations: {
        [REQUEST_LOADING]: (state, payload) => {
            state.loading = payload;
        },
    },
    actions: {
        [REQUEST_LOADING]: (context, payload) => {
            context.commit(REQUEST_LOADING, payload);
        }
    },
}