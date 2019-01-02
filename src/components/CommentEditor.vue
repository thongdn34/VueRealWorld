<script>
import ListErrorVue from './ListError.vue';
import { COMMENT_CREATE } from '../store/actionType';
export default {
  name:"CommentEditor",
  components:{
    'list-errors':ListErrorVue
  },
  props:{
    slug:{
      type:String,
      required:true
    },
    content:{
      type:String,
      required:true
    },
    userImage:{
      type:String,
      required:true
    }
  },
  data() {
    return {
      comment:this.content||null,
      errors:{}
    }
  },
  methods: {
    onSubmit(slug,comment){
      this.$store.dispatch(COMMENT_CREATE,{slug,comment})
        .then(()=>{
          this.comment=null;
          this.errors={};
        })
        .catch(({response})=>{
          this.errors=response.data.errors;
        });
    }
  },
}
</script>