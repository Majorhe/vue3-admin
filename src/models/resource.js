import Model from './model'
import moment from 'moment'

export default class AccountModel extends Model {
    id
    name
    path
    size
    type
    ext
    height
    width
    frameCount
    status
    userId
    createdAt
    updatedAt
    deletedAt

    transformResponse (attr) {
        this.id = attr.id
        this.name = attr.name
        this.path = attr.path
        this.size = attr.size
        this.type = attr.type
        this.ext = attr.ext
        this.height = attr.height
        this.width = attr.width
        this.frameCount = attr.frameCount
        this.status = attr.status
        this.userId = attr.userId
        this.createdAt = moment(attr.created_at).format('YYYY-MM-DD HH:mm:ss')
        this.updatedAt = moment(attr.updated_at).format('YYYY-MM-DD HH:mm:ss')
        this.deletedAt = moment(attr.deleted_at).format('YYYY-MM-DD HH:mm:ss')
    }
}

