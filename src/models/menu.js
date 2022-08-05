import Model from './model'
import moment from 'moment'

export default class MenuModel extends Model {
    id
    nam
    title
    parentid
    icon
    status
    type
    condition
    spacer
    listorder
    updatedAt
    createdAt

    transformResponse (attr) {
        this.id = attr.id
        this.name = attr.name
        this.title = attr.title
        this.parentid = attr.parentid
        this.icon = attr.icon
        this.status = attr.status
        this.type = attr.type
        this.condition = attr.condition
        this.spacer = attr.spacer
        this.listorder = attr.listorder
        this.updatedAt = moment(attr.updated_at).format('YYYY-MM-DD HH:mm:ss')
        this.createdAt = moment(attr.created_at).format('YYYY-MM-DD HH:mm:ss')
    }
}