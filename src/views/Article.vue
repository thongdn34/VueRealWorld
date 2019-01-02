<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article" :actions="true"></article-meta>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-xs-12">
          <div v-html="parseMarkdown(article.body)"></div>
          <ul class="tag-list">
            <li v-for="(tag, index) of article.tagList" :key="tag + index">
              <tag-app :name="tag" class="tag-default tag-pill tag-outline"></tag-app>
            </li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="article-actions">
        <article-meta :article="article" :actions="true"></article-meta>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <comment-editor v-if="isAuthenticated" :slug="slug" :userImage="currentUser.image"></comment-editor>
          <p v-else>
            <router-link :to="{ name: 'login' }">Sign in</router-link>or
            <router-link :to="{ name: 'register' }">sign up</router-link>to add comments on this article.
          </p>
          <comment
            v-for="(comment, index) in comments"
            :slug="slug"
            :comment="comment"
            :key="index"
          ></comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleMetaVue from "../components/ArticleMeta.vue";
import CommentVue from "../components/Comment.vue";
import CommentEditorVue from "../components/CommentEditor.vue";
import TagVue from "../components/Tag.vue";
import marked from "marked";
import store from "../store";
import { mapGetters } from "vuex";
import { FETCH_ARTICLE, FETCH_COMMENTS } from "../store/actionType";
export default {
  name: "Article",
  props: {
    slug: {
      type: String
    }
  },
  components: {
    "article-meta": ArticleMetaVue,
    'comment': CommentVue,
    "comment-editor": CommentEditorVue,
    "tag-app": TagVue
  },
  computed: {
    ...mapGetters(["article", "currentUser", "comments", "isAuthenticeted"])
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    }
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_ARTICLE, to.params.slug),
      store.dispatch(FETCH_COMMENTS, to.params.slug)
    ]).then(() => {
      next();
    });
  }
};
</script>