<template></template>

<script>
import { mapGetters } from "vuex";
import {
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  ARTICLE_DELETE,
  FETCH_PROFILE_FOLLOW,
  FETCH_PROFILE_UNFOLLOW
} from "../store/actionType.js";
export default {
  name: "ArticleAction",
  props: {
    article: { type: Object, required: true },
    canModify: { type: Boolean, required: true }
  },
  computed: {
    ...mapGetters(["profile", "isAuthenticated"])
  },
  methods: {
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.article.favorite ? FAVORITE_REMOVE : FAVORITE_ADD;
      this.$store.dispatch(action,this.article.slug);
    }
  }
};
</script>