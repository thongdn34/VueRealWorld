<template>
  <div class="article-meta">
    <router-link :to="{name:'profile',params:{username:article.author.username}}">
      <img :src="article.author.image">
    </router-link>
    <div class="info">
      <router-link
        :to="{name:'profile',params:{username:article.author.username}}"
        class="author"
      >{{article.author.username}}</router-link>
      <span class="date">{{article.createAt|date}}</span>
    </div>
    <template v-if="actions">
      <article-action :article="article" :canModify="isCurrentUser()"></article-action>
    </template>
    <template v-else>
      <button
        class="btn btn-sm pull-xs-right"
        v-if="!actions"
        @click="toggleFavorite"
        :class="{
        'btn-primary':article.favorited,
        'btn-outline-primary':!article.favorited
      }"
      >
        <i class="ion-heart"></i>
        <span class="counter">{{ article.favoritesCount }}</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArticleActionVue from "./ArticleAction.vue";
import { FAVORITE_REMOVE, FAVORITE_ADD } from "../store/actionType";
export default {
  name: "ArticleMeta",
  components: {
    "article-action": ArticleActionVue
  },
  props: {
    article: Object,
    actions: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.username && this.article.author.username) {
        return this.currentUser.username === this.article.author.username;
      }
      return false;
    },
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.article.favorited ? FAVORITE_REMOVE : FAVORITE_ADD;
      this.$store.dispatch(action, this.article.slug);
    }
  }
};
</script>