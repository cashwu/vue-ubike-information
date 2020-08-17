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
  name: "Pagination.vue",
  props: {
    currentPage : Number,
    totalDataCount : Number,
    pagination_max : Number,
    count_of_page : Number
  },
  data() {
    return {
      selfCurrentPage : this.currentPage,
      selfTotalDataCount : this.totalDataCount
    }
  },
  computed: {
    pagerAddAmount() {
      // 頁碼位移
      const tmp =
          this.selfTotalPageCount <= this.pagination_max
              ? 0
              : this.currentPage + 4 - this.pagerEnd;

      return tmp <= 0
          ? 0
          : this.selfTotalPageCount - (this.pagination_max + tmp) < 0
              ? this.selfTotalPageCount - this.pagination_max
              : tmp;
    },
    pagerEnd() {
      // 頁碼尾端
      return this.selfTotalPageCount <= this.pagination_max
          ? this.selfTotalPageCount
          : this.pagination_max;
    },
    selfTotalPageCount() {
      // 計算總頁數
      return Math.ceil(this.totalDataCount / this.count_of_page);
    },
  },
  methods: {
    setPage(page) {
      // 設定目前頁數
      if (page < 1 || page > this.selfTotalPageCount) {
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
