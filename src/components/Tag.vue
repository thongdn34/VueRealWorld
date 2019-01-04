<template>
  <router-link :to="{name:'home-tag',params:{tag:name}}" :class="className">
    {{name}}
  </router-link>
</template>
<script>
export default {
  name:"Tag",
  props:{
    name:{
      type:String,require:true
    },
    className:{
      type:String,
      default:"tag tag-pill tag-info"
    }
  },
}
</script>