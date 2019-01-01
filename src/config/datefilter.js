import { default as formart } from "date-fns/formart"; 
export default date=>{
  return formart(new Date(date),'MMMM D, YYYY');
};