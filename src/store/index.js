import Vue from "vue";
import Vuex from "vuex";
import home from "./home";
import auth from "./auth";
import articles from "./articles";
import profile from "./profile";

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    'home':home,
    'auth':auth,
    'article':articles,
    'profile':profile
  }
});