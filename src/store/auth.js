import apiService from '../config/service';
import jwt from '../config/jwt';

import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER
} from "./actionType";

import { SET_AUTH, CLEAR_AUTH, SET_ERROR } from "./mutationType";

const state={
  errors:null,
  user:{},
  isAuthenticated:!!jwt.getToken()
};

const getters={
  currentUser(state){
    return state.user;
  },
  isAuthenticated(state){
    return state.isAuthenticated;
  }
};

const actions={
  [LOGIN](context,credentials){
    return new Promise(resolve=>{
      apiService.post("users/login",{user:credentials})
      .then(({data})=>{
        context.commit(SET_AUTH,data.user);
        resolve(data);
      })
      .catch(({response})=>{
        context.commit(SET_ERROR,response.data.errors);
      });
    });
  },
  [LOGOUT](context){
    context.commit(CLEAR_AUTH);
  },
  [REGISTER](context,credentials){
    return new Promise((resolve,reject)=>{
      apiService.post("users",{user:credentials})
        .then(({data})=>{
          context.commit(SET_AUTH,data.user);
          resolve(data);
        })
        .catch(({response})=>{
          context.commit(SET_ERROR,response.data.errors);
          reject(response);
        });
    });
  },
  [CHECK_AUTH](context){
    if(jwt.getToken()){
      apiService.setHeader();
      apiService.get("user").then(({data})=>{
        context.commit(SET_AUTH,data.user);
      })
      .catch(({response})=>{
        context.commit(SET_ERROR,response.data.error);
      });
    }else{
      context.commit(CLEAR_AUTH);
    }
  },
  [UPDATE_USER](context,payload){
    const{email,username,password,image,bio}=payload;
    const user={
      email,username,bio,image
    };
    if(password){
      user.password=password;
    }
    return apiService.put("user",user).then(({data})=>{
      context.commit(SET_AUTH,data.user);
      return data;
    });
  }
};

const mutations={
  [SET_ERROR](state,error){
    state.error=error;
  },
  [SET_AUTH](state,user){
    state.isAuthenticated=true;
    state.user=user;
    state.error={};
    jwt.saveToken(state.user.token);
  },
  [CLEAR_AUTH](state){
    state.isAuthenticated=false,
    state.user={};
    state.error={};
    jwt.removeToken();
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}