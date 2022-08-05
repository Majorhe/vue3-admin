import { request } from './request'
import CategoryModel from "@/models/category";

export default {
    list (params) {
        return request('get', '/categories', params).then(res => {
            let result = res.data.map(item => { return CategoryModel.withResponse(item) })
            return Promise.resolve(result)
        })
    },
    add (data) {
        return request('post', '/categories', data)
    },
    update (data) {
        return request('put', `/categories/${data.id}`, data)
    },
    del (id) {
        return request('delete', `/categories/${id}`)
    }
}