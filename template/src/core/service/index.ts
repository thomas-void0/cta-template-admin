import { CreateAxiosDefaults } from 'axios'
import AxiosPro from './axiosPro'

export const BASE_CONFIG: CreateAxiosDefaults<any> = {
	// baseURL: 'http://127.0.0.1:3003',
	timeout: 5000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	}
}

const TOKEN_KEY = '@@cta-template-admin-authorization'

const request = new AxiosPro(BASE_CONFIG)

// 请求拦截
request.requestInterceptors(req => {
	const token = localStorage.getItem(TOKEN_KEY)
	if (token) {
		req.headers['authorization'] = `Bearer ${token}`
	}
	return req
})

// 响应拦截
request.responseInterceptors(res => {
	localStorage.setItem(TOKEN_KEY, res.headers['authorization'])
	const { code, msg, data } = res.data
	if (code === '000000') {
		return {
			success: true,
			msg,
			data
		}
	}
	return {
		success: false,
		msg,
		data
	}
})

export default request
