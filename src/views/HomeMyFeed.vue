<template>
  <div class="home-my-feed">
    <article-list type="feed"/>
  </div>
</template>


<script>
import ArticleListVue from '../components/ArticleList.vue';
export default {
  name:"HomeMyFeed",
  components:{
    'article-list':ArticleListVue
  }
}
</script>