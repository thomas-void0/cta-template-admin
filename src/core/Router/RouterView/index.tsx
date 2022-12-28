// 路由显示容器

import { FC, useEffect, useState } from 'react'
import { Provider, RouteConfigContext } from '../../context/router'
import { Route, Routes as RoutesCom } from 'react-router'

import { Routes } from '../type'
import { getItems } from '../utils'
import routes from '@/routes'
import { useGlobal } from '@/core/context/global'

const initState = {
	leftItems: [],
	topItems: [],
	routeAccess: {}
}

export type RouteContainerProps = {
	routes: Routes
	routeAccess: Record<string, boolean>
}

const RouterView: FC<any> = () => {
	const {
		globalState: { routeAccess }
	} = useGlobal()
	// const element = useRoutes(routes)
	const [routeState, setRouteState] = useState<RouteConfigContext>(initState)

	useEffect(() => {
		if (!routes.length) {
			return
		}
		const layoutReoutes =
			routes.find(route => route.path === '/*' || route.path === '/')?.children || []
		// 获取菜单需要显示的items
		const o = getItems(layoutReoutes, routeAccess || {})
		setRouteState(o)
	}, [routes, routeAccess])

	return (
		<Provider value={routeState}>
			<RoutesCom>
				{routes.map(route => (
					<Route key={route.path} path={route.path} element={route.element} />
				))}
			</RoutesCom>
		</Provider>
	)
}

export default RouterView
