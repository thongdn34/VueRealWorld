<template>
  <div class="home-tag">
    <article-list :tag="tag"></article-list>
  </div>
</template>

<script>
import ArticleListVue from '../components/ArticleList.vue';
export default {
  name:"HomeTag",
  components:{
    'article-list':ArticleListVue
  },
  computed:{
    tag(){
      return this.$route.params.tag
    }
  }
}
</script>