import axios, {
	AxiosRequestConfig,
	AxiosInstance,
	AxiosResponse,
	AxiosError
} from 'axios'
import type {
	RequestOptions,
	OriginResult,
	UploadFileParams,
	TransformedResultType
} from './axiosType'
import type { CreateAxiosOptions } from './axiosTransform'
import qs from 'qs'
import { AxiosCanceler } from '../service/axiosCancel'
import { cloneDeep, isFunction } from 'lodash-es'

// export * from '../typings/axiosTransform'

// Content-Type的枚举
export enum ContentTypeEnum {
	// 使用json格式上传参数
	JSON = 'application/json;charset=UTF-8',
	// 使用原始数据类型，用qs处理
	FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
	// 使用formData的方式传参
	FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

// 请求方法的枚举
export enum RequestEnum {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

// 请求结果设置
export enum ResultEnum {
	ERROR = 1,
	TIMEOUT = '401',
	TYPE = 'success',
	NotLoginText = 'Not logged in',
	NotLoginTextZh = '用户未登陆'
}

// axios模块
export class AxiosPro {
	private axiosInstance: AxiosInstance
	private readonly options: CreateAxiosOptions

	constructor(options: CreateAxiosOptions) {
		this.options = options
		this.axiosInstance = axios.create(options)
		this.setupInterceptors()
	}

	// 创建axios请求实例
	private createAxios(config: CreateAxiosOptions): void {
		this.axiosInstance = axios.create(config)
	}

	private getTransform() {
		const { transform } = this.options
		return transform
	}

	getAxios(): AxiosInstance {
		return this.axiosInstance
	}

	// 重新配置axios
	configAxios(config: CreateAxiosOptions) {
		if (!this.axiosInstance) {
			return
		}
		this.createAxios(config)
	}

	// 设置通用头部
	setHeader(headers: any): void {
		if (!this.axiosInstance) {
			return
		}
		Object.assign(this.axiosInstance.defaults.headers, headers)
	}

	// 拦截配置
	private setupInterceptors() {
		const transform = this.getTransform()
		if (!transform) {
			return
		}
		const {
			requestInterceptors,
			requestInterceptorsCatch,
			responseInterceptors,
			responseInterceptorsCatch
		} = transform

		const axiosCanceler = new AxiosCanceler()

		// 请求拦截器配置处理
		this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
			// 如果开启了取消重复请求，则禁止取消重复请求
			const {
				// @ts-ignore
				headers: { ignoreCancelToken }
			} = config

			const ignoreCancel =
				ignoreCancelToken !== undefined
					? ignoreCancelToken
					: this.options.requestOptions?.ignoreCancelToken

			!ignoreCancel && axiosCanceler.addPending(config)
			if (requestInterceptors && isFunction(requestInterceptors)) {
				config = requestInterceptors(config, this.options)
			}
			return config
		}, undefined)

		// 请求拦截错误捕获
		requestInterceptorsCatch &&
			isFunction(requestInterceptorsCatch) &&
			this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

		// 响应结果拦截器处理
		this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
			res && axiosCanceler.removePending(res.config)
			if (responseInterceptors && isFunction(responseInterceptors)) {
				res = responseInterceptors(res)
			}
			return res
		}, undefined)

		// 响应拦截错误捕获
		responseInterceptorsCatch &&
			isFunction(responseInterceptorsCatch) &&
			this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
	}

	// 文件上传
	uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
		const formData = new window.FormData()
		const customFilename = params.name || 'file'

		if (params.filename) {
			formData.append(customFilename, params.file, params.filename)
		} else {
			formData.append(customFilename, params.file)
		}

		if (params.data) {
			Object.keys(params.data).forEach(key => {
				const value = params.data![key]
				if (Array.isArray(value)) {
					value.forEach(item => {
						formData.append(`${key}[]`, item)
					})
					return
				}

				formData.append(key, params.data![key])
			})
		}

		return this.axiosInstance.request<T>({
			...config,
			method: 'POST',
			data: formData,
			headers: {
				'Content-type': ContentTypeEnum.FORM_DATA,
				// @ts-ignore
				ignoreCancelToken: true
			}
		})
	}

	// 支持formData
	supportFormData(config: AxiosRequestConfig) {
		const headers = config.headers || this.options.headers
		const contentType = headers?.['Content-Type'] || headers?.['content-type']

		if (
			contentType !== ContentTypeEnum.FORM_URLENCODED ||
			!Reflect.has(config, 'data') ||
			config.method?.toUpperCase() === RequestEnum.GET
		) {
			return config
		}

		return {
			...config,
			data: qs.stringify(config.data, { arrayFormat: 'brackets' })
		}
	}

	get<T = TransformedResultType>(
		config: AxiosRequestConfig,
		options?: RequestOptions
	): Promise<T> {
		return this.request({ ...config, method: 'GET' }, options)
	}

	post<T = TransformedResultType>(
		config: AxiosRequestConfig,
		options?: RequestOptions
	): Promise<T> {
		return this.request({ ...config, method: 'POST' }, options)
	}

	put<T = TransformedResultType>(
		config: AxiosRequestConfig,
		options?: RequestOptions
	): Promise<T> {
		return this.request({ ...config, method: 'PUT' }, options)
	}

	delete<T = TransformedResultType>(
		config: AxiosRequestConfig,
		options?: RequestOptions
	): Promise<T> {
		return this.request({ ...config, method: 'DELETE' }, options)
	}

	request<T = TransformedResultType>(
		config: AxiosRequestConfig,
		options?: RequestOptions
	): Promise<T> {
		let conf: CreateAxiosOptions = cloneDeep(config)
		const transform = this.getTransform()

		const { requestOptions } = this.options

		const opt: RequestOptions = Object.assign({}, requestOptions, options)

		const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {}
		if (beforeRequestHook && isFunction(beforeRequestHook)) {
			conf = beforeRequestHook(conf, opt)
		}
		conf.requestOptions = opt

		conf = this.supportFormData(conf)

		return new Promise<T>((resolve, reject) => {
			this.axiosInstance
				.request<any, AxiosResponse<OriginResult>>(conf)
				.then((res: AxiosResponse<OriginResult>) => {
					if (transformRequestHook && isFunction(transformRequestHook)) {
						try {
							const ret = transformRequestHook(res, opt) as unknown as T
							resolve(ret)
						} catch (err) {
							reject(err || new Error('request error!'))
						}
						return
					}
					resolve(res as unknown as Promise<T>)
				})
				.catch((e: Error | AxiosError) => {
					if (requestCatchHook && isFunction(requestCatchHook)) {
						reject(requestCatchHook(e, opt))
						return
					}
					if (axios.isAxiosError(e)) {
						// rewrite error message from axios in here
					}
					reject(e)
				})
		})
	}
}
