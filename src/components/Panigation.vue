<template>
  <nav>
    <ul class="pagination">
      <li
        v-for="page in pages"
        :data-test="`page-link-${page}`"
        :key="page"
        :class="paginationClass(page)"
        @click.prevent="changePage(page);"
        
      >
        <a class="page-link" href v-text="page"/>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Panigation",
  props: {
    pages: Array,
    currentPage: Number
  },
  methods: {
    changePage(page) {
      if (page === this.currentPage) return;
      this.$emit("update:currentPage", page);
    },
    paginationClass(page) {
      // console.log(page);
      
      return {
        "page-item": true,
        active: this.currentPage === page
      };
    }
  }
};
</script>