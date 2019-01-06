<template>
  <div>
    <list-errors :error="error"></list-errors>
    <form class="card comment-form" @submit.prevent="onSubmit(slug,comment);">
        <div class="card-block">
          <textarea name="comment" id="commentInput" class="form-control" v-model="comment" rows="5" placeholder="Your comment"></textarea>
        </div>
        <div class="crad-footer">
          <img :src="userImage" class="comment-author-img">
          <button class="btn btn-sm btn-primary">Post</button>
        </div>
      </form>
  </div>
</template>

<script>
import ListErrorVue from './ListError.vue';
import { COMMENT_CREATE } from '../store/actionType';
export default {
  name:"CommentEditor",
  components:{
    'list-errors':ListErrorVue
  },
  props:{
    slug:String,
    content:String,
    userImage:String
  },
  data() {
    return {
      comment:this.content||null,
      error:{}
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
          this.error=response.data.errors;
        });
    }
  },
}
</script>