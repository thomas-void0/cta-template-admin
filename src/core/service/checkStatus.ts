import { message, notification } from 'antd'
import type { ErrorMessageMode } from './axiosType'

const codeMessage = {
	200: '服务器成功返回请求的数据',
	201: '新建或修改数据成功',
	202: '一个请求已经进入后台排队（异步任务）',
	204: '删除数据成功',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
	401: '参数加密验证失败',
	403: '用户访问权限不足',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
	405: '请求方法不被允许',
	406: '请求的格式不可得',
	410: '请求的资源被永久删除，且不会再得到的',
	422: '当创建一个对象时，发生一个验证错误',
	500: '服务器发生错误',
	502: '网关错误',
	503: '服务不可用，服务器暂时过载或维护',
	504: '网关超时'
}

export function checkStatus(
	status: keyof typeof codeMessage,
	msg: string,
	errorMessageMode: ErrorMessageMode = 'message'
): void {
	const errMessage = codeMessage[status] || msg

	if (errMessage) {
		if (errorMessageMode === 'notification') {
			notification.error({
				message: `请求错误 ${status}`,
				description: '请稍后再试' || errMessage
			})
		} else if (errorMessageMode === 'message') {
			message.error(errMessage)
		}
	}
}
