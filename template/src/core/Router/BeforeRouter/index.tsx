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

	console.log('userInfo:', userInfo)

	const route = searchRoute(pathname, routes)
	const { access } = route

	// 判断是否登录
	if (!userInfo && route.path !== 'login') {
		return <Navigate to="/login" replace />
	}

	// 判断是否有权限
	if (access && routeAccess?.[access] === false && route.path !== '403') {
		return <Navigate to="/403" replace />
	}

	// 正常访问页面
	return children
}

export default BeforeRouter
