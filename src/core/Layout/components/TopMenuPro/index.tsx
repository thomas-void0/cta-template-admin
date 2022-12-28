// 头部菜单栏
import { Menu } from 'antd'
import { MenuState } from '../..'
import { withRouter } from '@/core/Router'

export interface TopMenuProProps {
	/* 修改菜单状态 */
	menuState: MenuState
	/* 修改菜单状态回调 */
	onMenuStateChange: (curState: MenuState) => void
}

const TopMenuPro = withRouter<TopMenuProProps>(props => {
	const { topItems, menuState, onMenuStateChange } = props

	function onSelect(options: any) {
		const { keyPath } = options
		onMenuStateChange({ ...menuState, selectedKeys: keyPath })
	}

	return (
		<Menu
			mode="horizontal"
			items={topItems}
			selectedKeys={menuState.selectedKeys}
			onSelect={onSelect}
		/>
	)
})

export default TopMenuPro
