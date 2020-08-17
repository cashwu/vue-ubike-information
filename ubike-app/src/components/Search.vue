<template>
  <p>站點名稱搜尋: <input type="text" v-model="selfSearchText" /></p>
</template>

<script>
export default {
  name: "Search.vue",
  props : {
    searchText : String
  },
  data() {
    return {
      selfSearchText : this.searchText
    }
  },
  watch : {
    selfSearchText(value) {
      this.$emit("update:searchText", value);
    }
  }
}
</script>

<style scoped>

</style>
