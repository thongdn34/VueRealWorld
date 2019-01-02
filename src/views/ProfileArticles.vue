<template>
  <div class="profile-page">
    <article-list :author="author" :item-per-page="5"></article-list>
  </div>
</template>

<script>
import ArticleListVue from "../components/ArticleList.vue";
export default {
  name: "ProfileArticles",
  components: {
    "article-list": ArticleListVue
  },
  computed: {
    author(){
      return this.$route.params.username;
    }
  }
};
</script>