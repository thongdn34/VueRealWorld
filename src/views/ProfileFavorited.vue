<template>
  <div class="profile-page">
   <article-list :favotired="favorited" :item-per-page="5"></article-list>
  </div>
</template>


<script>
import ArticleListVue from '../components/ArticleList.vue';
export default {
  name:"ProfileFavorited",
  components:{
    'article-list':ArticleListVue
  },
  computed: {
    favorited(){
      return this.$route.params.username;
    }
  },
}
</script>
