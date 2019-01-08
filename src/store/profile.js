
import apiService from "../config/service";
import {
  FETCH_PROFILE,
  FETCH_PROFILE_FOLLOW,
  FETCH_PROFILE_UNFOLLOW
} from "./actionType";
import { SET_PROFILE,SET_ERROR } from "./mutationType";

const state = {
  errors: {},
  profile: {}
};

const getters = {
  profile(state) {
    return state.profile;
  }
};

const actions={
  [FETCH_PROFILE](context,payload){
    const {username}=payload;
    return apiService.get("profiles",username)
      .then(async ({data})=>{
        await context.commit(SET_PROFILE,data.profile);
        return data;
      });
  },
  [FETCH_PROFILE_FOLLOW](context,payload){
    const{username}=payload;
    return apiService.post(`profiles/${username}/follow`)
      .then(({data})=>{
        context.commit(SET_PROFILE,data.profile);
        return data;
      });
  },
  [FETCH_PROFILE_UNFOLLOW](context,payload){
    const{username}=payload;
    return apiService.delete(`profiles/${username}/follow`)
      .then(({data})=>{
        context.commit(SET_PROFILE, data.profile);
        return data;
      });
  }
};

const mutations = {
  [SET_PROFILE](state, profile) {
    state.profile = profile;
    state.errors = {};
  },
  [SET_ERROR](state,error){
    state.profile={};
    state.error=error;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
}