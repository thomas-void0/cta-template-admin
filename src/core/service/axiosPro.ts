import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	CreateAxiosDefaults,
	InternalAxiosRequestConfig
} from 'axios'

export interface ResponseData {
	success: boolean
	msg: string
	data: any
}

type interceptorsFn<T> = (arg: T) => T

class AxiosPro<T = any> {
	private instance: AxiosInstance
	constructor(config: CreateAxiosDefaults<T>) {
		this.instance = axios.create(config)
	}

	get<T = ResponseData>(config: AxiosRequestConfig): Promise<T> {
		return this.instance({ ...config, method: 'GET' })
	}

	post<T = ResponseData>(config: AxiosRequestConfig): Promise<T> {
		return this.instance({ ...config, method: 'POST' })
	}

	put<T = ResponseData>(config: AxiosRequestConfig): Promise<T> {
		return this.instance({ ...config, method: 'PUT' })
	}

	requestInterceptors(fn: interceptorsFn<InternalAxiosRequestConfig<any>>) {
		this.instance.interceptors.request.use(req => {
			return fn(req)
		})
	}

	responseInterceptors(fn: (res: AxiosResponse<any, any>) => ResponseData) {
		this.instance.interceptors.response.use(res => {
			return fn(res) as unknown as AxiosResponse<ResponseData>
		})
	}
}

export default AxiosPro
