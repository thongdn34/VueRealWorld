<template>
  <div id="app">
    <header-app/>
    <router-view></router-view>
    <footer-app/>
  </div>
</template>

<script>
import HeaderVue from './components/Header.vue';
import FooterVue from './components/Footer.vue';

export default {
  name:"App",
  components:{
    'header-app':HeaderVue,
    'footer-app':FooterVue
  }
}
</script>
<style>
</style>
