<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{name:'register'}">Need an account?</router-link>
          </p>
          <ul v-if="errors" class="error-message">
            <li v-for="(item, index) in errors" :key="index">
              {{index}} {{item|error}}
            </li>
          </ul>
          <form @submit.prevent="onSubmit(email,password);">
            <fieldset class="form-group">
              <input type="text" class="form-control form-control-lg" v-model="email" placeholder="nhatthong34@gmail.com">
            </fieldset>
            <fieldset class="form-group">
              <input type="password" class="form-control form-control-lg" v-model="password" placeholder="password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { LOGIN } from '../store/actionType';
import { mapState } from 'vuex';
export default {
  name:"Login",
  data() {
    return {
      email:"",
      password:""
    }
  },
  methods:{
    onSubmit(email,password){
      this.$store.dispatch(LOGIN,{email,password})
        .then(()=>this.$router.push({name:'home'}));
    }
  },
  computed: {
    ...mapState({
      errors:state=>state.auth.errors
    })
  },
}
</script>