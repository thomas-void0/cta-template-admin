import { request, requestLegacy } from '@/core/service'

/** 获取用户登录信息 */
export const reqGetUserInfo = () => {
	return request.get({
		url: '/getUserInfo'
	})
}

/** 退出登录 */
export const reqLoginOut = () => {
	return requestLegacy.post({
		url: '/loginOut'
	})
}
