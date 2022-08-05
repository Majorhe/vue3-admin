import { request } from './request'

export default {
    list (params) {
        return request('get', '/mbox', params)
    },
    all () {
        return request('get', '/mbox/all_mbox')
    },
    detail (id) {
        return request('get', `/mbox/${id}`)
    },
    add (data) {
        return request('post', '/mbox', data)
    },
    update (data) {
        return request('put', `/mbox/${data.id}`, data)
    },
    del (id) {
        return request('delete', `/mbox/${id}`)
    },
}