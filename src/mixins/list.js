export default {
    data () {
        return {
            reload: false,
            loading: false,
            tableData: [],
            addDialogVisible: false,
            editDialogVisible: false,
            detailDialogVisible: false,
            size: 30,
            current: 1,
            pagination: {},
            formData: {}
        }
    },
    methods: {
        search () {
            this.current = 1
            this.loadListData()
        },
        sizeChange (data) {
            this.size = data
            this.loadListData()
        },
        currentChange (data) {
            this.current = data
            this.loadListData()
        },
        pervClick (data) {
            this.current = data
            this.loadListData()
        },
        nextClick (data) {
            this.current = data
            this.loadListData()
        }
    }
}
