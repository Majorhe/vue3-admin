import Model from './model'
import moment from 'moment'

export default class CategoryModel extends Model {
    id
    name
    pid
    status
    spacer
    createdAt

    transformResponse (attr) {
        this.id = attr.id
        this.name = attr.name
        this.pid = attr.pid
        this.status = attr.status
        this.spacer = attr.spacer
        this.createdAt = moment(attr.created_at).format('YYYY-MM-DD HH:mm:ss')
    }
}