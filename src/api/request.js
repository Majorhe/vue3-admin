import axios from 'axios'
import store from '@/store'
import Vue from 'vue'
import router from '../router'

axios.defaults.withCredentials = true

export const api = process.env.API
export const version = process.env.VERSION

export const request = (method = 'get', url = '/', params = {}) => {
    method = method.toLowerCase()
    return axios({
        method: `${method}`,
        url: `${api}${version}${url}`,
        data: params,
        params: (method === 'post' || method === 'put') ? {} : params,
        headers: {'Content-Type': 'application/json', 'Fingerprint': store.getters['fingerprint/fingerprint'], 'Authorization': store.getters['token/token']},
        timeout: 30000
    }).then(response => {
        // console.log('request data :::::::::', response)
        if (response.status === 200) {
            const data = response.data
            if (data.code === 200) {
                return Promise.resolve(data.data)
            } else if (data.code === 400) {
                Vue.prototype.$alert(data.message, '', {
                    confirmButtonText: '确定',
                    showClose: false,
                    callback: () => {
                        router.push({name: 'login'})
                    }
                })
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
