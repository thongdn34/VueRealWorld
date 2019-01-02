<template>
  <div class="home-global">
    <article-list type="all"/>
  </div>
</template>


<script>
import ArticleListVue from '../components/ArticleList.vue';
export default {
  name:"HomeGlobal",
  components:{
    'article-list':ArticleListVue
  }
}
</script>