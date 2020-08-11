
const app = Vue.createApp({
    data() {
        return {
            uBikeStops: [],
            uBikeStopsFilter: [],
            nameSearch: '',
            sortNoOrder: "asc",
            sortSbiOrder: "",
            sortTotOrder: ""
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
    methods: {
        Search(sort = 'no') {

            if (this.nameSearch === '') {
                this.uBikeStopsFilter = this.uBikeStops;
            } else {
                this.uBikeStopsFilter = this.uBikeStops.filter(u => u.sna.includes(this.nameSearch));
            }

            if (sort === 'no') {
                this.sortNo();
            }
            if (sort === 'sbi') {
                this.sortSbi();
            }
            if (sort === 'tot') {
                this.sortTot();
            }
        },
        sortNo() {
            this.sortTotOrder = '';
            this.sortSbiOrder = '';

            if (this.sortNoOrder === 'asc') {
                this.sortNoOrder = 'desc'
                this.uBikeStopsFilter.sort((a, b) => b.sno - a.sno);
            } else {
                this.sortNoOrder = 'asc'
                this.uBikeStopsFilter.sort((a, b) => a.sno - b.sno);
            }
        },
        sortSbi() {
            this.sortTotOrder = '';
            this.sortNoOrder = '';

            if (this.sortSbiOrder === 'asc') {
                this.sortSbiOrder = 'desc'
                this.uBikeStopsFilter.sort((a, b) => b.sbi - a.sbi);
            } else {
                this.sortSbiOrder = 'asc'
                this.uBikeStopsFilter.sort((a, b) => a.sbi - b.sbi);
            }
        },
        sortTot(){
            this.sortSbiOrder = '';
            this.sortNoOrder = '';

            if (this.sortTotOrder === 'asc') {
                this.sortTotOrder = 'desc'
                this.uBikeStopsFilter.sort((a, b) => b.tot - a.tot);
            } else {
                this.sortTotOrder = 'asc'
                this.uBikeStopsFilter.sort((a, b) => a.tot - b.tot);
            }
        }
    }
}).mount('#app');
