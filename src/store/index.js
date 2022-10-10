import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/modules/auth";
import user from "@/store/modules/user";
import http from "@/store/modules/http";
import alert from "@/store/modules/alert";
import post from "@/store/modules/post";
import modal from "@/store/modules/modal";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    http,
    auth,
    alert,
    modal,
    user,
    post,
  },
})
