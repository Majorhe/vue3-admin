import { request } from './request'
import PaginationModel from "@/models/pagination";

export default {
    list (params) {
        return request('get', '/user/list', params).then(res => {
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
    detail (id) {
        return request('get', `/user/${id}`)
    },
    add (data) {
        return request('post', '/user', data)
    },
    update (data) {
        return request('put', `/user/${data.id}`, data)
    },
    delete (id) {
        return request('delete', `/user/${id}`)
    },
    search(params) {
        return request('get', '/user/search', params)
    }
}