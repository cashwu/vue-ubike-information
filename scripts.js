const app = Vue.createApp({
    data() {
        return {
            uBikeStops: [],
            uBikeStopsFilter: [],
            nameSearch: '',
            currSortType: 'sno',
            currSortOrder: 'asc',
            pageCount: 10,
            totalPage: 0,
            totalCount: 0,
            currentPage: 1,
            pager: [1, 2, 3, 4, 5],
            middlePager: 3,
        }
    },
    created() {
        fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
            .then(res => res.json())
            .then(json => {
                const stops = Object.keys(json.retVal).map(key => json.retVal[key]);
                this.uBikeStopsFilter = this.uBikeStops = stops;

                this.totalCount = this.uBikeStopsFilter.length;
                this.totalPage = Math.ceil(this.totalCount / this.pageCount);
                this.currentPage = 1;

                this.uBikeStopsFilter = this.uBikeStopsFilter.slice(0, this.pageCount);
            });
    },
    watch: {
        nameSearch() {
            this.Search();
        },
    },
    methods: {
        Search(page) {

            if (this.nameSearch === '') {
                this.uBikeStopsFilter = this.uBikeStops;
            } else {
                this.uBikeStopsFilter = this.uBikeStops.filter(u => u.sna.includes(this.nameSearch));
            }

            this.Sort(this.currSortType, '');

            this.currentPage = page ?? 1;
            this.totalCount = this.uBikeStopsFilter.length;
            this.totalPage = Math.ceil(this.totalCount / 10);

            if (this.totalCount > 10) {

                let begin = this.pageCount * (this.currentPage - 1);
                let end = this.pageCount * this.currentPage;

                this.uBikeStopsFilter = this.uBikeStopsFilter.slice(begin, end);

                if (this.currentPage > this.middlePager && this.middlePager + 2 !== this.totalPage) {
                    this.middlePager += 1;
                } else if (this.currentPage < this.middlePager && this.middlePager - 2 !== 1) {
                    this.middlePager -= 1;
                }

                if (this.totalPage >= 5)
                {
                    this.pager = [this.middlePager - 2, this.middlePager - 1, this.middlePager, this.middlePager + 1, this.middlePager + 2];
                }
                else if (this.totalPage < 5)
                {
                    this.pager = [...Array(this.totalPage).keys()].map((item) => item + 1);
                }
            }
        },
        Sort(sortType, sortOrder) {

            this.currSortType = sortType;

            if (sortOrder !== '') {
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
