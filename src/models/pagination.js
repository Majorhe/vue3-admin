import Model from './model'

export default class PaginationModel extends Model {
    total
    pageNum
    currentPage
    totalPages

    transformResponse (attr) {
        this.total = parseInt(attr.total)
        this.currentPage = parseInt(attr.current_page)
        this.pageNum = parseInt(attr.page_num ? attr.page_num : 20)
        this.totalPages = parseInt(attr.last_page)
    }
}
