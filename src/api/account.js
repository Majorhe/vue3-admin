import { request } from './request'
import PaginationModel from '@/models/pagination'

export default {
    login (username, pwd, code) {
        return request('post', '/login', {name: username, password: pwd, code: code})
    },
    logout () {
        return request('post', '/logout')
    },
    list(params) {
        return request('get', '/account/list', params).then(res => {
            let result = {}
            result.data = res.data
            Object.defineProperty(result, 'pagination', {
                value: PaginationModel.withResponse(res),
                enumerable: true,
                configurable: true
            })
            return Promise.resolve(result)
        })
    },
    add(data) {
        return request('post', '/account/add', data)
    },
    update(data) {
        return request('put', `/account/edit/${data.id}`, data)
    },
    del(id) {
        return request('delete', `/account/delete/${id}`)
    }
}