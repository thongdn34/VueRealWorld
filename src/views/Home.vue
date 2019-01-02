<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Conduit</h1>
        <p>A place to share your knowledge</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feel-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isAuthenticated" class="nav-item">
                <router-link
                  :to="{name:'home-my-feed'}"
                  class="nav-link"
                  active-class="active"
                >Your Feed</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{name:'home'}"
                  exact
                  class="nav-link"
                  active-class="active"
                >Global Feed</router-link>
              </li>
              <li class="nav-item" v-if="tag">
                <router-link
                  :to="{name:'home-tag',params:{tag}}"
                  class="nav-link"
                  active-class="active"
                >
                  <i class="ion-pound"></i>
                  {{ tag }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tag</p>
            <div class="tag-list">
              <tag-app v-for="(item, index) in tags" :key="index" v-bind:name="item"></tag-app>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import TagVue from "../components/Tag.vue";
import { mapGetters } from "vuex";
import { FETCH_TAGS } from "../store/actionType";
export default {
  name: "Home",
  components: {
    "tag-app": TagVue
  },
  mounted() {
    this.$store.dispatch(FETCH_TAGS);

  },
  computed: {
    ...mapGetters(["isAuthenticated", "tags"]),
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>