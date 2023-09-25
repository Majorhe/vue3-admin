import Model from './model'

export default class PaginationModel extends Model {
  total
  pageNum
  currentPage
  perPage
  totalPage
  lastPage // 是否为最后一页 1: 是， 0: 否

  transformResponse (attributes) {
    this.total = parseInt(attributes.total)
    this.pageNum = parseInt(attributes.per_page)
    this.currentPage = parseInt(attributes.current_page)
    this.perPage = this.currentPage === 1 ? 0 : this.currentPage - 1
    this.totalPage = attributes.last_page
    this.lastPage = attributes.last_page
  }
}
