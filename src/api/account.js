import { request } from './request'
import AccountModel from '@/models/account'
import PaginationModel from '@/models/pagination'

export default {
    login (username, pwd) {
        return request('post', '/login', {name: username, password: pwd})
    },
    logout () {

    },
    list(params) {
        return request('get', '/admin', params).then(res => {
            let result = {}
            result.data = res.data.map(item => { return AccountModel.withResponse(item) })
            Object.defineProperty(result, 'pagination', {
                value: PaginationModel.withResponse(res),
                enumerable: true,
                configurable: true
            })
            return Promise.resolve(result)
        })
    },
    add(data) {
        return request('post', '/admin', data)
    },
    update(data) {
        return request('put', `/admin/${data.id}`, data)
    },
    del(id) {
        return request('delete', `/admin/${id}`)
    }
}