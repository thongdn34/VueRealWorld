import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { API_URL } from "../config/config";
import jwt from '../config/jwt';


const apiService={
  init(){
    Vue.use(VueAxios,axios);
    Vue.axios.defaults.baseURL=API_URL;
  },
  setHeader(){
    Vue.axios.defaults.headers.common["Authorization"]=`Token ${jwt.getToken()}`;
  },
  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
  get(url, slug=""){    
    return Vue.axios.get(`${url}/${slug}`).catch(err=>{
      throw new Error(`API service error ${err}`);
    });
  },
  post(url,params){
    return Vue.axios.post(`${url}`,params);
  },
  put(resource,params){
    return Vue.axios.put(`${resource}`,params);
  },
  update(url,slug,params) {
    return Vue.axios.put(`${url}/${slug}`,params);
  },
  delete(url){
    return Vue.axios.delete(`${url}`).catch(err=>{
      throw new Error(`error ${err}`);
    })
  }
};
export default apiService;

export const tagsService={
  get(){
    return apiService.get("tags");
  }
};
export const articleService={
  query(type,params){
    return apiService.query('articles'+(type==='feed'?'/feed':""),{
      params:params
    });
  },
  get(slug){
    return apiService.get("articles",slug);
  },
  create(params){
    return apiService.post("articles",{article:params});
  },
  update(params,slug){
    return apiService.update("articles",slug,{articles:params});
  },
  delete(slug){
    return apiService.delete(`articles/${slug}`);
  }
};
export const commentService={
  get(slug){
    if(typeof slug!=='string'){
      throw new Error("CommentsService.get() article slug required to fetch comments");
    }
    return apiService.get("articles",`${slug}/comments`);
  },
  post(slug,payload){
    return apiService.post(`articles/${slug}/comments`,{
      comment:{body:payload}
    });
  },
  remove(slug,commentId){
    return apiService.delete(`articles/${slug}/comments/${commentId}`);
  }
}
export const favoriteService={
  add(slug){
    return apiService.post(`articles/${slug}/favorite`);
  },
  remove(slug){
    return apiService.delete(`articles/${slug}/favorite`);
  }
};