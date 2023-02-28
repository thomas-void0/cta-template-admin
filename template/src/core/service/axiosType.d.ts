// 错误信息提示类型
export type ErrorMessageMode = 'none' | 'notification' | 'message' | undefined

export interface RequestOptions {
	// 拼接请求参数
	joinParamsToUrl?: boolean
	// 格式化请求时间
	formatDate?: boolean
	// 是否处理请求结果
	isTransformResponse?: boolean
	// 费否返回本机响应头
	isReturnNativeResponse?: boolean
	// 是否添加到url
	joinPrefix?: boolean
	// 接口地址，不填的话使用默认地址
	apiUrl?: string
	// 请求拼接路径
	urlPrefix?: string
	// 错误信息提示类型
	errorMessageMode?: ErrorMessageMode
	// 是否添加一个时间戳
	joinTime?: boolean
	ignoreCancelToken?: boolean
	// 是否在报头中发送token
	withToken?: boolean
}

// 原始数据类型
export interface OriginResult<T = any> {
	code: number | string
	message?: string
	msg?: string
	data: T
	success?: boolean
	value?: {
		code: string
		data: T
		message: string
	}
}

// 转化结果类型
export interface TransformedResultType<T = any> {
	value?: any
	success: boolean
	result: T
	message: string
	code?: string
}

// 上传文件
export interface UploadFileParams {
	// 其他参数
	data?: Record<string, any>
	// 文件参数接口字段名
	name?: string
	// 文件名类型
	file: File | Blob
	// 文件名
	filename?: string
	[key: string]: any
}
