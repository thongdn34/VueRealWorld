<template>
  <ul class="tag-list">
    <li class="tag-default tag-pill tag-outline" v-for="(tag,index) in tags" :key="index">
      <span v-text="tag"/>
    </li>
  </ul>
</template>
<script>
export default {
  name:"TagList",
  props:{
    tags:Array
  }
}
</script>