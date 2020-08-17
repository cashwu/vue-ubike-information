<!--suppress ALL -->
<template>
  <table class="table table-striped">
    <thead>
    <tr>
      <th @click="setSort('sno')">
        #
        <span v-show="currentSort === 'sno'">
              <i class="fa"
                 :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'"
                 aria-hidden="true"></i>
            </span>
      </th>
      <th>
        場站名稱
      </th>
      <th>
        場站區域
      </th>
      <th @click="setSort('sbi')" class="pointer">
        目前可用車輛
        <span v-show="currentSort === 'sbi'">
              <i class="fa"
                  :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'"
                  aria-hidden="true"></i>
            </span>
      </th>
      <th @click="setSort('tot')" class="pointer">
        總停車格
        <span v-show="currentSort === 'tot'">
              <i class="fa"
                  :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'"
                  aria-hidden="true"></i>
            </span>
      </th>
      <th>
        資料更新時間
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="s in slicedUbikeStops" :key="s.sno">
      <td>{{ s.sno }}</td>
      <td>{{ s.sna }}</td>
      <td>{{ s.sarea }}</td>
      <td>{{ s.sbi }}</td>
      <td>{{ s.tot }}</td>
      <td>{{ timeFormat(s.mday) }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: "UbikeTable",
  props: {
    searchText: String,
    currentPage: Number,
  },
  data() {
    return {
      currentSort: "sno",
      isSortDesc: false,
      ubikeStops: [],
      countOfPage: 10
    }
  },
  computed: {
    filtedUbikeStops() {
      // 過濾搜尋
      return this.ubikeStops.length === 0
          ? []
          : this.ubikeStops.filter(d => d.sna.includes(this.searchText));
    },
    sortedUbikeStops() {
      // 拿過濾的結果做排序
      const filtedStops = [...this.filtedUbikeStops];

      return this.isSortDesc
          ? filtedStops.sort((a, b) => b[this.currentSort] - a[this.currentSort])
          : filtedStops.sort((a, b) => a[this.currentSort] - b[this.currentSort]);
    },
    slicedUbikeStops() {
      // 將排序的結果做分頁切割
      const start = (this.currentPage - 1) * this.countOfPage;
      const end =
          start + this.countOfPage <= this.sortedUbikeStops.length
              ? start + this.countOfPage
              : this.sortedUbikeStops.length;

      return this.sortedUbikeStops.slice(start, end);
    }
  },
  watch: {
    sortedUbikeStops() {
      let totalPageCount = Math.ceil(this.filtedUbikeStops.length / this.countOfPage);
      this.$emit("update:totalPageCount", totalPageCount);
      this.$emit("resetcurrentpage");
    },
  },
  methods: {
    timeFormat(val) {
      // 時間格式
      const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
      return val.replace(pattern, "$1/$2/$3 $4:$5:$6");
    },
    setSort(sortType) {
      // 切換排序
      if (sortType === this.currentSort) {
        this.isSortDesc = !this.isSortDesc;
      } else {
        this.currentSort = sortType;
        this.isSortDesc = false;
      }
    }
  },
  created() {
    // 欄位說明請參照:
    // http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48

    // sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
    // sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
    // lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
    // snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態
    fetch("https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz")
        .then(res => res.json())
        .then(res => {
          // 將 json 轉陣列後存入 this.ubikeStops
          this.ubikeStops = Object.keys(res.retVal).map(key => res.retVal[key]);
        });
  }
}
</script>

<style scoped>

</style>
