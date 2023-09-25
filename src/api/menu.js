import { request } from './request'

export default {
    list (params) {
        return request('get', '/menu/list', params)
    },
    detail (id) {
        return request('get', `/menu/${id}`)
    },
    add (data) {
        return request('post', '/menu/add', data)
    },
    update (data) {
        return request('put', `/menu/edit/${data.id}`, data)
    },
    del (id) {
        return request('delete', `/menu/delete/${id}`)
    },
    switch (id, status) {
        return request('post', `/menu/switch/${id}`, {status: status})
    }
}