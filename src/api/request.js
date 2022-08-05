import axios from 'axios'
import store from '@/store'
import router from '@/router'

axios.defaults.withCredentials = false

// export const api = process.env.VUE_APP_API
export const api = 'http://192.168.0.16/'
export const prefix = process.env.VUE_APP_API_PREFIX

export const request = (method = 'get', url = '/', params = {}) => {
    method = method.toLowerCase()
    return axios({
        method: `${method}`,
        url: `${api}${prefix}${url}`,
        data: params,
        params: (method === 'post' || method === 'put') ? {} : params,
        headers: {'Content-Type': 'application/json', 'authorization': 'Bearer ' + store.getters['user/token']},
        timeout: 30000
    }).then(response => {
        // console.log('request data :::::::::', response)
        if (response.status === 200) {
            const data = response.data
            if (data.errcode == undefined || data.errcode === 0) {
                return Promise.resolve(data)
            } else if (data.errcode === 401) {
                router.push({name: 'login'})
                return Promise.reject(data.message)
            } else {
                return Promise.reject(data.message)
            }
        }
        return Promise.resolve([])
    }).catch(err => {
        // console.log('request error::::::', err)
        return Promise.reject(err.message === undefined ? err : err.message)
    })
}
