import axios, { AxiosRequestConfig, Canceler } from 'axios'
import { isFunction, omit } from 'lodash-es'

// 用于存储每个请求的标识和取消功能
let pendingMap = new Map<string, Canceler>()

// 判断两次的url是否一致
export const getPendingUrl = (config: AxiosRequestConfig) => {
	return [
		config.method,
		config.url,
		JSON.stringify(omit(config.params, ['_t', 'xyz', 'nonce'])),
		JSON.stringify(config.data)
	].join('&')
}

export class AxiosCanceler {
	// 添加请求
	addPending(config: AxiosRequestConfig) {
		this.removePending(config)
		const url = getPendingUrl(config)
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken(cancel => {
				if (!pendingMap.has(url)) {
					// 如果没有请求在pending状态，那么就添加它
					pendingMap.set(url, cancel)
				}
			})
	}

	// 清除所有的pending请求
	removeAllPending() {
		pendingMap.forEach(cancel => {
			cancel && isFunction(cancel) && cancel()
		})
		pendingMap.clear()
	}

	// 移除pending请求
	removePending(config: AxiosRequestConfig) {
		const url = getPendingUrl(config)

		if (pendingMap.has(url)) {
			// 如果在pending中有当前的请求标识符
			// 当前请求需要被取消和删除
			const cancel = pendingMap.get(url)
			cancel && cancel(url)
			pendingMap.delete(url)
		}
	}

	// 重置
	reset(): void {
		pendingMap = new Map<string, Canceler>()
	}
}
