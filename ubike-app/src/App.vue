<template>
  <div id="app">
    <!-- 搜尋框 -->
    <Search v-model:searchText="searchText" />

    <!-- 表格 -->
    <UbikeTable @resetcurrentpage="updateCurrentPage"
                v-model:totalDataCount="totalDataCount"
                :search-text="searchText"
                :current-Page="currentPage"
                :count_of_page="10" />

    <!-- 頁籤 -->
    <Pagination ref="pagination"
                v-model:current-page="currentPage"
                v-model:total-data-count="totalDataCount"
                :pagination_max="10"
                :count_of_page="10" />
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
      totalDataCount: 0
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
