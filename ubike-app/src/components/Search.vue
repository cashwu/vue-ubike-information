<template>
  <p>站點名稱搜尋: <input type="text" v-model="selfSearchText" /></p>
</template>

<script>
export default {
  name: "Search",
  props : {
    searchText : String
  },
  computed : {
    selfSearchText : {
      get() {
        return this.searchText;
      },
      set(value) {
        this.$emit("update:searchText", value);
      }
    }
  },
}
</script>

<style scoped>

</style>
