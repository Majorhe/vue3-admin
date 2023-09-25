import { request } from './request'
export default {
	SendCode(params){
		return request('post', '/sendCode', params)
	}
}