import { request } from './request'
import PaginationModel from "@/models/pagination";

export default {
    list (params) {
        return request('get', '/sale_calendar', params).then(res => {
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
        return request('post', '/sale_calendar', data)
    },
    update (data) {
        return request('put', `/sale_calendar/${data.id}`, data)
    },
    del (id) {
        return request('delete', `/sale_calendar/${id}`)
    },
    switch (id, status) {
        return request('post', `/sale_calendar/${id}/set_status`, {status: status})
    }
}