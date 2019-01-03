<template>
  <div class="article-preview">
    <article-meta isPreview :article="article"/>
    <router-link class="preview-link" :to="articleLink">
      <h1 class="text-info">{{article.title}}</h1>
      <p>{{article.description}}</p>
      <span>...Read more...</span>
      <tag-list :tags="article.tagList"/>
    </router-link>
  </div>
</template>

<script>
import ArticleMetaVue from "./ArticleMeta.vue";
import TagListVue from "./TagList.vue";
export default {
  name: "ArticlePreview",
  components: {
    "article-meta": ArticleMetaVue,
    "tag-list": TagListVue
  },
  props: {
    article: { type: Object, required: true }
  },
  computed: {
    articleLink() {
      return {
        name: "article",
        params: {
          slug: this.article.slug
        }
      };
    }
  }
};
</script>