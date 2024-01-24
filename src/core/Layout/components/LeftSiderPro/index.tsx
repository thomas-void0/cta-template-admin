// 左侧菜单栏

import { Layout, Menu } from 'antd'

import { Items } from '@/core/context/router'
import { MenuState } from '../..'
import { isFunction } from 'lodash-es'
import styles from './index.module.css'
import withRouter from '@/core/Router/withRouter'

const { Sider } = Layout

export interface BaseLeftSiderProProps {
	/* 收起后的宽度，默认80 */
	collapsedWidth?: number
	/* 侧边栏宽度，默认200 */
	siderWidth?: number
	/* 是否渲染侧边栏  默认为true */
	renderSider?: boolean | ((leftItems: Items) => JSX.Element)
}

export interface LeftSiderProProps extends BaseLeftSiderProProps {
	collapsed: boolean
	/* 修改菜单状态 */
	menuState: MenuState
	/* 修改菜单状态回调 */
	onMenuStateChange: (curState: MenuState) => void
}

const LeftSiderPro = withRouter<LeftSiderProProps>(props => {
	const {
		collapsed,
		collapsedWidth = 80,
		siderWidth,
		renderSider,
		leftItems,
		menuState,
		onMenuStateChange
	} = props

	// 不渲染侧边栏，直接返回
	if (renderSider === false) {
		return null
	}

	// 渲染自定义侧边栏
	if (isFunction(renderSider)) {
		return renderSider(leftItems)
	}

	function onOpenChange(openKeys: string[]) {
		onMenuStateChange({ ...menuState, openKeys })
	}

	return (
		<Sider
			collapsedWidth={collapsedWidth}
			className={styles.sider}
			trigger={null}
			collapsed={collapsed}
			width={siderWidth}
		>
			<Menu
				mode="inline"
				items={leftItems}
				className={styles['menu-border-none']}
				selectedKeys={menuState.selectedKeys}
				openKeys={menuState.openKeys}
				onOpenChange={onOpenChange}
			/>
		</Sider>
	)
})

export default LeftSiderPro
