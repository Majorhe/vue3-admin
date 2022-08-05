import { request } from './request'

export default {
    list (params) {
        return request('get', '/auth_rule', params)
    },
    detail (id) {
        return request('get', `/auth_rule/${id}`)
    },
    add (data) {
        return request('post', '/auth_rule', data)
    },
    update (data) {
        return request('put', `/auth_rule/${data.id}`, data)
    },
    del (id) {
        return request('delete', `/auth_rule/${id}`)
    },
    switch (id, status) {
        return request('post', `/auth_rule/${id}/set_status`, {status: status})
    }
}