<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name:'home'}">
        <p class="text-info">Sutrix</p>
      </router-link>
      <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{name:'home'}">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{name:'login'}">
            <i class="ion-compose">Sign in</i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{name:'register'}">
            <i class="ion-compose">Sign up</i>
          </router-link>
        </li>
      </ul>
      <ul v-else class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{name:'home'}">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{name:'article-edit'}">
            <i class="ion-compose"></i>&nbsp;New Article
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{name:'settings'}">
            <i class="ion-gear-a">&nbsp;Setting</i>
          </router-link>
        </li>
        <li class="nav-item" v-if="currentUser.username">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{name:'profile',params:{username:currentUser.username}}"
          >{{currentUser.username}}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  }
};
</script>