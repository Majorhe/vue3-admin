import { request } from './request'

export default {
    list (params) {
        return request('get', '/role/list', params)
    },
    add (data) {
        return request('post', '/role/add', data)
    },
    update (data) {
        return request('put', `/role/edit/${data.id}`, data)
    },
    del (id) {
        return request('delete', `/role/delete/${id}`)
    },
    switch (id) {
        return request('post', `/role/switch/${id}`)
    },
    authorizeList(id) {
        return request('get', `/role/menu/${id}`)
    },
    authorize(id, menu) {
        return request('post', `/role/menu/${id}`, menu)
    }
}