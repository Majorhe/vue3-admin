import { request } from './request'
import PaginationModel from '@/models/pagination'
import ResourceModel from "@/models/resource";

export default {
    list (params) {
        return request('get', '/material', params).then(res => {
            let result = {}
            result.data = res.data.map(item => { return ResourceModel.withResponse(item) })
            Object.defineProperty(result, 'pagination', {
                value: PaginationModel.withResponse(res),
                enumerable: true,
                configurable: true
            })
            return Promise.resolve(result)
        })
    },
    upload(file, path = 'other') {
        return request('post', '/material', {file: file, path: path})
    },
    download() {

    },
    delete() {

    }
}