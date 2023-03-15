// 路由守卫组件
import { Navigate, useLocation } from 'react-router'
import routes from '@/routes'
import { searchRoute } from '../utils'
import { useGlobal } from '@/core/context/global'

export interface BeforeRouterProps {
	children: JSX.Element
}

const BeforeRouter = (props: BeforeRouterProps) => {
	const { children } = props
	const { pathname } = useLocation()
	const {
		globalState: { routeAccess, userInfo }
	} = useGlobal()

	const route = searchRoute(pathname, routes)
	const { access } = route

	// 判断是否登录
	if (!userInfo) {
		return <Navigate to="/login" replace />
	}

	// 判断是否有权限
	if (access && routeAccess?.[access] === false) {
		return <Navigate to="/403" replace />
	}

	// 正常访问页面
	return children
}

export default BeforeRouter
