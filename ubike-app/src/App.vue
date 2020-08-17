<template>
  <div id="app">
    <!-- 搜尋框 -->
    <Search v-model:searchText="searchText" />

    <!-- 表格 -->
    <UbikeTable @resetcurrentpage="updateCurrentPage"
                v-model:totalPageCount="totalPageCount"
                :search-text="searchText"
                :current-Page="currentPage" />

    <!-- 頁籤 -->
    <Pagination ref="pagination"
                v-model:current-page="currentPage"
                v-model:total-page-count="totalPageCount" />
  </div>
</template>

<script>

import Search from "@/components/Search";
import UbikeTable from "@/components/UbikeTable";
import Pagination from "@/components/Pagination";

export default {
  name: 'App',
  components: {
    Search,
    UbikeTable,
    Pagination
  },
  data() {
    return {
      searchText: "",
      currentPage: 1,
      totalPageCount: 0
    };
  },
  methods: {
    updateCurrentPage(){
      this.currentPage = 1;
      this.$refs.pagination.resetCurrentPage();
    }
  }
}
</script>

<style>
body{ padding: 1em; }
.pointer { cursor: pointer; }
</style>
