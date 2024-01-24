import { RouteObject } from 'react-router'
import { ReactNode } from 'react'
import { Items } from '../context/router'

export type Merge<T, U, X = Pick<U, Exclude<keyof U, keyof T & keyof U>>> = Pick<
	T & X,
	keyof T | keyof X
>
interface RouteExtension {
	/* 路由显示icon */
	icon?: ReactNode
	/* 在菜单中显示的名称,如果没有name则不在菜单中显示 */
	name?: string
	/* 权限相关 */
	access?: string
	/* 是否要开启keep-alive, 默认是false */
	keepAlive?: boolean
	/* layout布局相关，默认true */
	layout?:
		| boolean
		| {
				/* 渲染左边的sider组件 */
				leftSiderRender?: boolean
				/* 是否渲染到左边的菜单项中 */
				leftItemRender?: boolean
				/* 是否渲染头部header组件 */
				headerRender?: boolean
				/* 是否渲染到头部的菜单项目中 */
				topItemRender?: boolean
		  }
	/* 扩展的children */
	children?: RouteConfig[]
}

export type RouteConfig = Merge<RouteExtension, RouteObject>

export type Routes = RouteConfig[]
export type AddItemArgs = {
	route: RouteConfig
	curPath: string
}
export type DeepSeparateArgs = {
	route: RouteConfig
	leftItems?: Items
	topItems?: Items
	parentPath: string
	routeAccess: Record<string, boolean>
}
