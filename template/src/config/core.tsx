import HeaderRight from '@/components/HeaderRight'
import IconLogo from '@/assets/img/logo.svg'
import { InitialStateType } from '@/core/context/global'
import { LayoutProProps } from '@/core/Layout'
// import { reqGetUserInfo } from '@/api'

// layout配置
export const layoutSettings: LayoutProProps = {
	logo: IconLogo,
	headerRight: <HeaderRight />
}

// 初始化配置
export const getInitialState = async (): Promise<InitialStateType> => {
	const values: InitialStateType = {
		settings: layoutSettings,
		userInfo: {},
		accessInfo: []
	}

	// 获取用户登录信息
	// const userRes = await reqGetUserInfo()
	// if (userRes.data) {
	// 	values.userInfo = userRes.data
	// }

	return values
}
