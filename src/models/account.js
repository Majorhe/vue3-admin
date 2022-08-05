import Model from './model'
import moment from 'moment'

export default class AccountModel extends Model {
    id
    name
    title
    groupId
    status
    lastLoginTime
    createdAt

    transformResponse (attr) {
        this.id = attr.id
        this.name = attr.name
        this.title = attr.auth_group_title
        this.groupId = attr.auth_group_id
        this.status = attr.status
        this.lastLoginTime = moment(attr.last_login_time).format('YYYY-MM-DD HH:mm:ss')
        this.createdAt = moment(attr.created_at).format('YYYY-MM-DD HH:mm:ss')
    }
}