// 路由表工具

import { AddItemArgs, DeepSeparateArgs, RouteConfig, Routes } from './type'
import { ItemType, SubMenuType } from 'antd/lib/menu/hooks/useItems'
import { LazyExoticComponent, ReactNode, Suspense } from 'react'
import { cloneDeep, isObject } from 'lodash-es'

import { Items } from '../context/router'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'

// 添加item项
function addItem(args: AddItemArgs) {
	const { curPath, route } = args
	const { name, icon, children } = route

	const o: ItemType = {
		key: curPath,
		label: Array.isArray(children) ? name : <Link to={curPath}>{name}</Link>,
		children: []
	}
	if (icon) {
		o.icon = icon
	}
	if (!children || !children?.length) {
		// @ts-ignore
		delete o.children
	}
	return o
}

// 是否添加到topItems
function isPushTopItems(route: RouteConfig) {
	const { layout } = route

	if ('layout' in route) {
		if (isObject(layout)) {
			// 不渲染左侧sider组件，肯定不加leftItems
			if ('headerRender' in layout && layout.headerRender === false) {
				return false
			}

			// 不渲染
			if ('topItemRender' in layout && layout.topItemRender === false) {
				return false
			}
		}
	}
	return true
}

// 是否添加到leftItems
function isPushLeftItems(route: RouteConfig) {
	const { layout } = route

	if ('layout' in route) {
		if (isObject(layout)) {
			// 不渲染左侧sider组件，肯定不加leftItems
			if ('leftSiderRender' in layout && layout.leftSiderRender === false) {
				return false
			}

			// 不渲染
			if ('leftItemRender' in layout && layout.leftItemRender === false) {
				return false
			}
		}
	}

	return true
}

// 分离路由，筛选出需要left，和top分开渲染的路由
function deepSeparate(args: DeepSeparateArgs) {
	const { route, leftItems, topItems, parentPath, routeAccess } = args
	const { name, layout, children, path, access } = route

	// 无权限
	if (access && !routeAccess[access]) return

	// 如果不存在名字 || 不需要布局
	if (!name || layout === false) return

	const curPath = `${parentPath}/${path!}`

	const o = addItem({
		route,
		curPath
	})

	const isLeft = isPushLeftItems(route)
	const isTop = isPushTopItems(route)

	isLeft && leftItems?.push(cloneDeep(o))
	isTop && topItems?.push(cloneDeep(o))

	const lastLeftItem = leftItems?.at(-1) as SubMenuType
	const lastTopItem = topItems?.at(-1) as SubMenuType

	const nextLeftItems = lastLeftItem?.children
	const nextTopItems = lastTopItem?.children

	children?.forEach(child => {
		const args: DeepSeparateArgs = {
			route: child,
			parentPath: curPath,
			leftItems: nextLeftItems,
			topItems: nextTopItems,
			routeAccess
		}
		!isLeft && delete args.leftItems
		!isTop && delete args.topItems
		deepSeparate(args)
	})
}

// 获取菜单配置项
export function getItems(layoutReoutes: Routes, routeAccess: Record<string, boolean>) {
	// 找到layout需要使用的路由配置
	const leftItems: Items = []
	const topItems: Items = []
	layoutReoutes.forEach(route => {
		deepSeparate({
			route,
			leftItems,
			topItems,
			parentPath: '',
			routeAccess
		})
	})

	return {
		leftItems,
		topItems
	}
}

// 过滤路由配置权限
// export function filterRoutesAccess(routes: Routes, checkFn: (access: string) => boolean) {
// 	const _deep = (list: Routes) => {
// 		for (let i = 0; i < list.length; i++) {
// 			const curRoute = list[i]
// 			const { access, children } = curRoute

// 			const isNext = children?.length

// 			if (!access) {
// 				isNext && _deep(children)
// 				continue
// 			}

// 			if (checkFn(access)) {
// 				isNext && _deep(children)
// 			} else {
// 				list.splice(i, 1)
// 				i--
// 			}
// 		}
// 	}

// 	_deep(routes)
// }

/**
 * @description 路由懒加载
 * @param {Element} Com 需要访问的组件
 * @returns element
 */
export const lazyLoad = (Com: LazyExoticComponent<any>): ReactNode => {
	return (
		<Suspense
			fallback={
				<Spin
					size="large"
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%'
					}}
				/>
			}
		>
			<Com />
		</Suspense>
	)
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns RouteConfig
 */
export const searchRoute = (aimPath: string, routes: Routes): RouteConfig => {
	const lastStr = aimPath.split('/').at(-1)
	const _deep = (routes: Routes) => {
		let result: RouteConfig = {}
		for (let i = 0; i < routes.length; i++) {
			const item = routes[i]
			if (item.path === lastStr) return item
			if (item.children?.length) {
				const res = _deep(item.children)
				if (Object.keys(res).length) result = res
			}
		}
		return result
	}
	return _deep(routes)
}
