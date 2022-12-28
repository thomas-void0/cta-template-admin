/* eslint-disable @typescript-eslint/no-misused-promises */
// axios配置

import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { ContentTypeEnum, RequestEnum, ResultEnum, AxiosPro } from './Axios'
import { OriginResult, RequestOptions } from './axiosType'
import { message as antdMessage, notification } from 'antd'
import { formatRequestDate, joinTimestamp } from './axiosUtils'

import type { AxiosResponse } from 'axios'
import { checkStatus } from './checkStatus'
import { isString } from 'lodash-es'
import qs from 'qs'
import setEncryption from './setEncryption'

/**
 * 将对象拼接到url上
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
	let parameters = ''
	for (const key in obj) {
		parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
	}
	parameters = parameters.replace(/&$/, '')
	return /\?$/.test(baseUrl)
		? baseUrl + parameters
		: baseUrl.replace(/\/?$/, '?') + parameters
}

export function is(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`
}

export function isObject(val: any): val is Record<any, any> {
	return val !== null && is(val, 'Object')
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
	let key: string
	for (key in target) {
		src[key] = isObject(src[key])
			? deepMerge(src[key], target[key])
			: (src[key] = target[key])
	}
	return src
}

function alterMessage(options: RequestOptions, msg: string | undefined) {
	if (options.errorMessageMode === 'notification') {
		notification.error({
			message: '请求错误',
			description: msg
		})
	} else if (options.errorMessageMode === 'message') {
		antdMessage.error(msg)
	}
}

// 数据处理，方便区分多种处理方式
const transform: AxiosTransform = {
	// 处理请求数据。如果数据不是预期格式，可直接抛出错误
	transformRequestHook: (res: AxiosResponse<OriginResult>, options: RequestOptions) => {
		const { isTransformResponse, isReturnNativeResponse } = options
		// 是否返回原生响应头 比如：需要获取响应头时使用该属性
		if (isReturnNativeResponse) {
			return res
		}
		// 不进行任何处理，直接返回
		// 用于页面代码可能需要直接获取code，data，message这些信息时开启
		if (!isTransformResponse) {
			return res.data
		}

		// // // 老接口返回的不是code000000
		// if (isTransformResponse && res.status == 200 && res.data.success) {
		// 	return res.data
		// }

		// 错误的时候返回
		const { data } = res

		if (!data) {
			alterMessage(options, '服务出错')
			return {
				success: false,
				result: null,
				message: '服务出错'
			}
		}

		const { code, data: result, message, value, msg } = data

		// 这里逻辑可以根据项目进行修改
		const successCode = ['000000', '1', 0, 1, 2000]
		const hasSuccess =
			successCode.includes(code) || successCode.includes(value?.code as string)

		if (hasSuccess) {
			return {
				success: true,
				result: result ?? value?.data,
				message: (message || msg || value?.message)!
			}
		}

		if (
			value?.message === ResultEnum.NotLoginText ||
			value?.message === ResultEnum.NotLoginTextZh
		) {
			return {
				success: false,
				message: '',
				code: `${code}`,
				result: null
			}
		}

		// 在此处根据自己项目的实际情况对不同的code执行不同的操作
		// 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
		let timeoutMsg = message || value?.message || msg

		switch (code) {
			case ResultEnum.TIMEOUT:
				timeoutMsg = '参数错误'
				alterMessage(options, timeoutMsg)
				break
			default:
				break
		}

		// errorMessageMode=‘notification’的时候会显示notification，而不是消息提示，用于一些比较重要的错误
		// errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示

		return {
			success: false,
			result: null,
			message: timeoutMsg || '请求出错，请稍后重试'
		}
	},

	// 请求之前处理config
	beforeRequestHook: (config, options) => {
		const {
			apiUrl,
			joinPrefix,
			joinParamsToUrl,
			formatDate,
			joinTime = true,
			urlPrefix
		} = options

		if (joinPrefix && urlPrefix) {
			config.url = `${urlPrefix}${config.url!}`
		}

		if (apiUrl && isString(apiUrl)) {
			config.url = `${apiUrl}${config.url!}`
		}
		const params = config.params || {}

		const data = config.data || false
		if (formatDate && data && !isString(data)) {
			formatRequestDate(data)
		}
		if (config.method?.toUpperCase() === RequestEnum.GET) {
			if (!isString(params)) {
				// 给 get 请求加上时间戳参数，避免从缓存中拿数据。
				config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
			} else {
				// 兼容restful风格
				config.url = `${config.url!}${params}${joinTimestamp(joinTime, true)}`
				config.params = undefined
			}
		} else {
			// post 默认json请求
			if (
				config.method?.toUpperCase() === RequestEnum.POST &&
				!config.headers?.['Content-Type'] &&
				!config.headers?.['content-type']
			) {
				config.headers = {
					...config.headers,
					'Content-Type': ContentTypeEnum.JSON
				}
			}
			if (!isString(params)) {
				formatDate && formatRequestDate(params)
				if (
					Reflect.has(config, 'data') &&
					config.data &&
					Object.keys(config.data).length > 0
				) {
					config.data = data
					config.params = params
				} else {
					// 非GET请求如果没有提供data，则将params视为data
					config.data = params
					config.params = undefined
				}
				if (joinParamsToUrl) {
					config.url = setObjToUrlParams(
						config.url as string,
						Object.assign({}, config.params, config.data)
					)
				}
			} else {
				// 兼容restful风格
				config.url = `${config.url!}${params}`
				config.params = undefined
			}
		}
		return config
	},

	// 请求拦截器处理
	requestInterceptors: (config, options) => {
		// 请求之前处理config
		// 加密
		if (config.method?.toLocaleLowerCase() === 'get') {
			config.params = setEncryption(config.url, config.params)
		}

		if (config.method?.toLocaleLowerCase() === 'post') {
			const contentType =
				options.headers?.['Content-Type'] || options.headers?.['content-type']

			if (contentType === ContentTypeEnum.JSON) {
				config.params = setEncryption(config.url)
			} else if (contentType === ContentTypeEnum.FORM_URLENCODED) {
				config.data = setEncryption(config.url, config.data)
			}
		}

		return config
	},

	// 响应拦截器处理
	responseInterceptors: (res: AxiosResponse<any>) => {
		return res
	},

	// 响应错误处理
	responseInterceptorsCatch: (error: any) => {
		const { response, code, message, config } = error || {}
		const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
		const msg: string = response?.data?.error?.message ?? ''
		const err: string = error?.toString?.() ?? ''
		let errMessage = ''

		try {
			if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
				errMessage = '接口请求超时，请刷新页面重试'
			}
			if (err?.includes('Network Error')) {
				errMessage = '网络异常，请检查您的网络连接是否正常'
				console.error(err)
			}

			if (errMessage) {
				if (errorMessageMode === 'notification') {
					notification.error({
						message: '请求错误',
						description: errMessage
					})
				} else if (errorMessageMode === 'message') {
					antdMessage.error(errMessage)
				}
				return Promise.resolve({
					success: false,
					result: null,
					message: 'error'
				})
			}
		} catch (e) {
			throw new Error(e as string)
		}

		checkStatus(error?.response?.status, msg, errorMessageMode)

		return Promise.reject(error)
	},

	// 请求错误捕获
	requestCatchHook: e => Promise.reject(e)
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
	return new AxiosPro(
		deepMerge(
			{
				// See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
				// authentication schemes，e.g: Bearer
				// authenticationScheme: 'Bearer',
				authenticationScheme: '',
				timeout: 30 * 1000,
				headers: { 'Content-Type': ContentTypeEnum.JSON },
				// 如果是form-data格式
				// headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
				// 数据处理方式
				transform,
				// 配置项，下面的选项都可以在独立的接口请求中覆盖
				requestOptions: {
					// 默认将prefix 添加到url
					joinPrefix: true,
					// 是否返回原生响应头 比如：需要获取响应头时使用该属性
					isReturnNativeResponse: false,
					// 需要对返回数据进行处理
					isTransformResponse: true,
					// post请求的时候添加参数到url
					joinParamsToUrl: false,
					// 格式化提交参数时间
					formatDate: true,
					// 消息提示类型
					errorMessageMode: 'message',
					// 接口地址
					apiUrl: '',
					// 接口拼接地址
					urlPrefix: '',
					//  是否加入时间戳
					joinTime: true,
					// 忽略重复请求
					ignoreCancelToken: true,
					// 是否携带token
					withToken: true
				},
				paramsSerializer: (params: any) => qs.stringify(params, { indices: false })
			},
			opt || {}
		)
	)
}

export const DEFAULT_CONFIG = {
	withCredentials: true,
	requestOptions: {
		/* @ts-ignore */
		urlPrefix: 'http://test-gw.newrank.cn:18080/api'
	},
	headers: {
		'n-token': '342bdbf6864146f59730fbd6eace18f9'
	}
}

// 示例请求实例
export const request = createAxios(DEFAULT_CONFIG)

//  请求老的走nginx的接口
export const requestLegacy = createAxios({})

export default createAxios
