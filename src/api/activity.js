import { request } from './request'
import PaginationModel from '@/models/pagination'

export default {
    list (params) {
        return request('get', '/activity', params).then(res => {
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
        return request('get', `/activity/${id}`)
    },
    add (data) {
        return request('post', '/activity', data)
    },
    update (data) {
        return request('put', `/activity/${data.id}`, data)
    },
    del (id) {
        return request('delete', `/activity/${id}`)
    },
    switch (id, status) {
        return request('post', `/activity/${id}/set_status`, {status: status})
    }
}