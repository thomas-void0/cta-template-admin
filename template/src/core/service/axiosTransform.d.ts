// 数据处理类，可根据工程进行配置
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, TransformedResultType, OriginResult } from './axiosType'

export interface CreateAxiosOptions extends AxiosRequestConfig {
	authenticationScheme?: string
	transform?: AxiosTransform
	requestOptions?: RequestOptions
}

export type ResultType<T = any> =
	| TransformedResultType<T>
	| OriginResult<T>
	| AxiosResponse<OriginResult<T>>

export abstract class AxiosTransform {
	// 请求前的进程配置
	beforeRequestHook?: (
		config: AxiosRequestConfig,
		options: RequestOptions
	) => AxiosRequestConfig

	// 请求成功处理
	transformRequestHook?: (
		res: AxiosResponse<OriginResult>,
		options: RequestOptions
	) => ResultType | undefined

	// 请求失败处理
	requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

	// 请求之前的拦截器
	requestInterceptors?: (
		config: AxiosRequestConfig,
		options: CreateAxiosOptions
	) => AxiosRequestConfig

	// 请求之后的拦截器
	responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

	// 请求之前的拦截器错误处理
	requestInterceptorsCatch?: (error: Error) => void

	// 请求之后的拦截器错误处理
	responseInterceptorsCatch?: (error: Error) => void
}
