import { request } from './request'
import PaginationModel from "@/models/pagination";

export default {
    list (params) {
        return request('get', '/works/tokens', params).then(res => {
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
    update (data) {
        return request('put', `/works/tokens/${data.id}`, data)
    },
    destroy (id) {
        return request('delete', `/works/tokens/${id}`)
    }
}