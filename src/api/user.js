import { request } from './request'
import PaginationModel from "@/models/pagination";

export default {
    list (params) {
        return request('get', '/users', params).then(res => {
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
    all () {
        return request('get', '/users')
    },
    detail (id) {
        return request('get', `/users/${id}`)
    },
    add (data) {
        return request('post', '/users', data)
    },
    update (data) {
        return request('put', `/users/${data.id}`, data)
    },
    del (id) {
        return request('delete', `/users/${id}`)
    },
    search(params) {
        return request('get', '/users/search', params)
    }
}