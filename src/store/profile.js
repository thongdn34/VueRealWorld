
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
      .then(({data})=>{
        console.log(data);
        
        context.commit(SET_PROFILE,data.profile);
        return data;
      })
      .catch((response)=>{
        console.log(response);
        
        context.commit(SET_ERROR, response.data.errors);
      })
  },
  [FETCH_PROFILE_FOLLOW](context,payload){
    const{username}=payload;
    return apiService.post(`profile/${username}/follow`)
      .then(({data})=>{
        context.commit(SET_PROFILE,data.profile);
        return data;
      });
  },
  [FETCH_PROFILE_UNFOLLOW](context,payload){
    const{username}=payload;
    return apiService.delete(`profile/${username}/follow`)
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