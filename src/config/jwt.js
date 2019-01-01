const ID_TOKEN='token';

export const getToken=()=>{
  return localStorage.getItem(ID_TOKEN);
}
export const saveToken=token=>{
  localStorage.setItem(ID_TOKEN,token);
}
export const removeToken=()=>{
  return localStorage.removeItem(ID_TOKEN);
}
export default {getToken,saveToken,removeToken};