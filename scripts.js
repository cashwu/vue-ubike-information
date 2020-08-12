const app = Vue.createApp({
    data() {
        return {
            uBikeStops: [],
            uBikeStopsFilter: [],
            nameSearch: '',
            currSortType: 'sno',
            currSortOrder: 'asc'
        }
    },
    created() {
        fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
            .then(res => res.json())
            .then(json => {
                const stops = Object.keys(json.retVal).map(key => json.retVal[key]);
                this.uBikeStopsFilter = this.uBikeStops = stops;
            });
    },
    watch: {
        nameSearch() {
            this.Search();
        },
    },
    methods: {
        Search() {

            if (this.nameSearch === '') {
                this.uBikeStopsFilter = this.uBikeStops;
            } else {
                this.uBikeStopsFilter = this.uBikeStops.filter(u => u.sna.includes(this.nameSearch));
            }

            this.Sort(this.currSortType, '');
        },
        Sort(sortType, sortOrder) {

            this.currSortType = sortType;

            if (sortOrder !== ''){
                this.currSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
            }

            if (this.currSortOrder === 'asc') {
                this.uBikeStopsFilter.sort((a, b) => a[this.currSortType] - b[this.currSortType]);
            } else {
                this.uBikeStopsFilter.sort((a, b) => b[this.currSortType] - a[this.currSortType]);
            }
        }
    }
}).mount('#app');
