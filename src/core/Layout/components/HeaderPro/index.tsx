// 头部组件

import { Dispatch, ReactNode, createElement } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import TopMenuPro, { TopMenuProProps } from '../TopMenuPro'

import { Items } from '@/core/context/router'
import { Layout } from 'antd'
import { isFunction } from 'lodash-es'
import styles from './index.module.css'
import withRouter from '@/core/Router/withRouter'

const { Header } = Layout

export interface BaseHeaderProProps {
	/* logo */
	logo?: string | (() => ReactNode)
	/* 是否渲染头部菜单 默认为true */
	renderHeaderMenu?: boolean | ((topItems: Items) => ReactNode)
	/* 头部高度 */
	headerHeight?: number
	/* 是否渲染头部 默认为true */
	renderHeader?: boolean | ((topItems: Items) => JSX.Element)
	/* 额外的右侧用户信息  */
	headerRight?: ReactNode
}

export interface HeaderProProps extends BaseHeaderProProps, TopMenuProProps {
	/* 是否折叠 */
	collapsed: boolean
	/* 控制折叠 */
	setCollapsed: Dispatch<React.SetStateAction<boolean>>
	/* logo部分的宽度 和siderWidth保持一致 */
	logoWidth: number
}

const HeaderPro = withRouter<HeaderProProps>(props => {
	const {
		collapsed,
		setCollapsed,
		logo,
		headerHeight = 64,
		renderHeaderMenu,
		logoWidth,
		renderHeader,
		topItems,
		menuState,
		onMenuStateChange,
		headerRight
	} = props

	// 不渲染头部，直接返回
	if (renderHeader === false) {
		return null
	}

	// 渲染自定义头部
	if (isFunction(renderHeader)) {
		return renderHeader(topItems)
	}

	const renderLogo = () => {
		if (isFunction(logo)) {
			return logo()
		}
		return logo ? <img src={logo} /> : 'logo'
	}

	return (
		<Header className={styles.head} style={{ height: `${headerHeight}px` }}>
			<div className={styles.left}>
				<div
					className={styles.logo}
					style={{ width: `${logoWidth}px`, height: `${headerHeight}px` }}
				>
					{renderLogo()}
				</div>
				{createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
					className: styles.trigger,
					onClick: () => setCollapsed(!collapsed)
				})}
				{renderHeaderMenu && (
					<TopMenuPro menuState={menuState} onMenuStateChange={onMenuStateChange} />
				)}
			</div>
			{headerRight}
		</Header>
	)
})

export default HeaderPro
