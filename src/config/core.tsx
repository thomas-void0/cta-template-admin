import HeaderRight from '@/components/HeaderRight'
import IconLogo from '@/assets/img/logo.svg'
import { InitialStateType } from '@/core/context/global'
import { LayoutProProps } from '@/core/Layout'
// import { reqGetUserInfo } from '@/api'
// import { message } from 'antd'
// import config from './memoryConfig'

// layout配置
export const layoutSettings: LayoutProProps = {
	logo: IconLogo,
	headerRight: <HeaderRight />,
	watermark: {
		text: '456'
	}
	// isTabs:false
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
	// if (!userRes.result) {
	// 	// 跳转登录链接
	// 	window.location.href = config.loginUrl
	// 	return values
	// } else if (userRes.message) {
	// 	message.error(userRes.message)
	// }

	values.userInfo = {
		nickName: 'thomas-void0'
	}
	// values.settings.watermark = {
	// 	text: values.userInfo.nickName
	// }

	return values
}
