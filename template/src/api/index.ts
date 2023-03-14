import request from '@/core/service'

/** 获取用户登录信息 */
interface ReqLoginParams {
	username: string
	password: string
}
export const reqLogin = (data: ReqLoginParams) => {
	return request.post({
		url: '/user/login',
		data
	})
}

/** 退出登录 */
export const reqLoginOut = () => {
	return request.post({
		url: '/user/loginOut'
	})
}

/** 注册用户 */
export const reqSignIn = () => {
	return request.post({
		url: '/user/signIn'
	})
}
