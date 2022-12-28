import { request, requestLegacy } from '@/core/service'

/** 获取用户登录信息 */
export const reqGetUserInfo = () => {
	return request.get({
		url: '/throwdata/throw/data/user/getUserInfo'
	})
}

/** 退出登录 */
export const reqLoginOut = () => {
	return requestLegacy.post({
		url: '/nr/user/login/loginOut'
	})
}
