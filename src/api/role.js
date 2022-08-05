import { request } from './request'

export default {
    list (params) {
        return request('get', '/auth_group', params)
    },
    all () {
        return request('get', '/get_auth_group')
    },
    detail (id) {
        return request('get', `/auth_group/${id}`)
    },
    add (data) {
        return request('post', '/auth_group', data)
    },
    update (data) {
        return request('put', `/auth_group/${data.id}`, data)
    },
    del (id) {
        return request('delete', `/auth_group/${id}`)
    },
    authorizeList(id) {
        return request('get', `/auth_group/grant/${id}`)
    },
    authorize(id, data) {
        return request('post', `/auth_group/grant/${id}`, data)
    }
}