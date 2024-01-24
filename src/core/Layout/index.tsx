import HeaderPro, { BaseHeaderProProps } from './components/HeaderPro'
import LeftSiderPro, { BaseLeftSiderProProps } from './components/LeftSiderPro'
import { useEffect, useState } from 'react'
import { useLocation, useRoutes } from 'react-router'

import { Layout } from 'antd'
import { layoutSettings } from '@/config/core'
import routes from '@/routes'
import ContentPro from './components/ContentPro'
import withRouter from '../Router/withRouter'

export interface LayoutProProps extends BaseLeftSiderProProps, BaseHeaderProProps {
	/* 默认是否收起 */
	defaultCollapsed?: boolean
	/* 是否开启足迹标签  默认为true */
	isTabs?: boolean
	/* keepalive最大缓存数量 */
	maxLength?: number
}

export type MenuState = {
	selectedKeys: string[]
	openKeys: string[]
}

// 获取openKeys
function getOpenKeys(location: ReturnType<typeof useLocation>) {
	const { pathname } = location
	const pathList = pathname?.split('/') || []
	const keys = []
	while (pathList.pop()) {
		const prePath = pathList.join('/')
		prePath && keys.push(prePath)
	}
	return keys
}

const LayoutPro = withRouter(props => {
	const {
		logo,
		headerHeight = 56,
		renderSider = true,
		renderHeader = true,
		siderWidth = 200,
		renderHeaderMenu = true,
		defaultCollapsed = false,
		isTabs = true,
		headerRight,
		maxLength
	} = layoutSettings || props

	const { location } = props
	const layoutRoutes = routes.find(item => item.path === '/*')?.children || []
	const ele = useRoutes(layoutRoutes, location)
	const [collapsed, setCollapsed] = useState(defaultCollapsed)
	const [menuState, setMenuState] = useState<MenuState>({
		openKeys: [],
		selectedKeys: []
	})

	useEffect(() => {
		setMenuState(prev => {
			const next = {
				openKeys: [...prev.openKeys, ...getOpenKeys(location)],
				selectedKeys: [location.pathname]
			}
			return next
		})
	}, [location.pathname])

	return (
		<Layout style={{ height: '100vh' }}>
			<HeaderPro
				logo={logo}
				logoWidth={siderWidth}
				renderHeader={renderHeader}
				headerHeight={headerHeight}
				renderHeaderMenu={renderHeaderMenu}
				headerRight={headerRight}
				setCollapsed={setCollapsed}
				collapsed={collapsed}
				menuState={menuState}
				onMenuStateChange={setMenuState}
			/>
			<Layout>
				<LeftSiderPro
					siderWidth={siderWidth}
					collapsed={collapsed}
					renderSider={renderSider}
					menuState={menuState}
					onMenuStateChange={setMenuState}
				/>
				<ContentPro maxLength={maxLength} isTabs={isTabs}>
					{ele}
				</ContentPro>
			</Layout>
		</Layout>
	)
})

export default LayoutPro
