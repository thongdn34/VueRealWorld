<template>
  <div>
    <div v-if="isLoading" class="article-preview">Loading articles...</div>
    <div v-else>
      <div v-if="articles.length === 0" class="article-preview">No articles are here... yet.</div>
      <article-preview
        v-for="(article, index) in articles"
        :article="article"
        :key="index"
      />
      <panigation :pages="pages" :currentPage.sync="currentPage"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArticlePreviewVue from "./ArticlePreview.vue";
import PanigationVue from "./Panigation.vue";
import { FETCH_ARTICLES } from "../store/actionType";
export default {
  name: "ArticleList",
  components: {
    "article-preview": ArticlePreviewVue,
    'panigation': PanigationVue
  },
  props: {
    type: {
      type: String,
      default: "all"
    },
    author: {
      type: String
    },
    tag: {
      type: String
    },
    favorited: {
      type: String
    },
    itemPerPage: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    ...mapGetters(["articlesCount", "isLoading", "articles"]),
    config() {
      const { type } = this;
      const filters = {
        offset: (this.currentPage - 1) * this.itemPerPage,
        limit: this.itemPerPage
      };
      if (this.author) {
        filters.author = this.author;
      }
      if (this.tag) {
        filters.tag = this.tag;
      }
      if (this.favorited) {
        filters.favorited = this.favorited;
      }
      return {
        type,
        filters
      };
    },
    pages() {
      if (this.isLoading || this.articleCount <= this.itemPerPage) {
        return [];
      }
      return [
        ...Array(Math.ceil(this.articlesCount / this.itemPerPage)).keys()
      ].map(e => e + 1);
    },
    
  },
  watch: {
    currentPage(newValue) {
      this.config.filters.offset = (newValue - 1) * this.itemPerPage;
      this.fetchArticle();
    },
    type() {
      this.resetPanigation();
      this.fetchArticle();
    },
    author() {
      this.resetPanigation();
      this.fetchArticle();
    },
    tag() {
      this.resetPanigation();
      this.fetchArticle();
    },
    favorited() {
      this.resetPanigation();
      this.fetchArticle();
    }
  },
  mounted() {
    this.fetchArticle();
  },
  methods: {
    fetchArticle() {
      this.$store.dispatch(FETCH_ARTICLES, this.config);
    },
    resetPanigation() {
      this.config.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
