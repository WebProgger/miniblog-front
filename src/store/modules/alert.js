import { ALERT_HIDE, ALERT_SHOW } from "@/store/actions/alert";

export default {
    state: {
        show: false,
        data: {
            style: 'success',
            text: 'text'
        }
    },
    getters: {
        isAlertShow: state => state.show,
        getAlertData: state => state.data
    },
    mutations: {
        [ALERT_SHOW]: (state, payload) => {
            state.show = true;
            state.data = payload;
        },
        [ALERT_HIDE]: state => {
            state.show = false;
        },
    },
    actions: {
        [ALERT_SHOW]: ({ commit }, payload) => {
            commit(ALERT_SHOW, payload);
        },
        [ALERT_HIDE]: ({ commit }) => {
            commit(ALERT_HIDE);
        },
    },
}