import { request } from './request'
import PaginationModel from "@/models/pagination";

export default {
    list (params) {
        return request('get', '/works', params).then(res => {
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
    add (data) {
        return request('post', '/works', data)
    },
    update (data) {
        return request('put', `/works/${data.id}`, data)
    },
    del (id) {
        return request('delete', `/works/${id}`)
    },
    search (params) {
        return request('get', '/works/search', params)
    }
}