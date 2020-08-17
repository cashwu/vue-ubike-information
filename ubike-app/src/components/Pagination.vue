<template>
  <nav v-if="pagerEnd > 0">
    <ul class="pagination">
      <li @click.prevent="setPage(selfCurrentPage - 1)" class="page-item">
        <a class="page-link" href>Previous</a>
      </li>

      <li v-for="i in pagerEnd"
          :class="{ active: i + pagerAddAmount === selfCurrentPage }"
          :key="i"
          @click.prevent="setPage(i + pagerAddAmount)"
          class="page-item">
        <a class="page-link" href>{{ i + pagerAddAmount }}</a>
      </li>

      <li @click.prevent="setPage(selfCurrentPage + 1)" class="page-item">
        <a class="page-link" href>Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage : Number,
    totalPageCount : Number
  },
  data() {
    return {
      selfCurrentPage : this.currentPage,
      paginationMax : 10
    }
  },
  computed: {
    pagerAddAmount() {
      // 頁碼位移
      const tmp =
          this.totalPageCount <= this.paginationMax
              ? 0
              : this.currentPage + 4 - this.pagerEnd;

      return tmp <= 0
          ? 0
          : this.totalPageCount - (this.paginationMax + tmp) < 0
              ? this.totalPageCount - this.paginationMax
              : tmp;
    },
    pagerEnd() {
      // 頁碼尾端
      return this.totalPageCount <= this.paginationMax
          ? this.totalPageCount
          : this.paginationMax;
    },
  },
  methods: {
    setPage(page) {
      // 設定目前頁數
      if (page < 1 || page > this.totalPageCount) {
        return;
      }
      this.selfCurrentPage = page;

      this.$emit("update:currentPage", page);
    },
    resetCurrentPage() {
      this.selfCurrentPage = 1;
    }
  }
}
</script>

<style scoped>

</style>
