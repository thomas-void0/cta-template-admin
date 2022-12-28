// 头部右侧用户登录信息

import { Avatar, Button, Popover, Space, Typography } from 'antd'

import { FC } from 'react'
import styles from './index.module.css'
import { reqLoginOut } from '@/api'
import config from '@/config/memoryConfig'
import { useGlobal } from '@/core'

const HeaderRight: FC<any> = () => {
	const { globalState } = useGlobal()

	function handleLoginOut() {
		reqLoginOut()
			.then(() => {
				window.location.href = config.loginUrl
			})
			.catch(() => {
				window.location.href = config.loginUrl
			})
	}

	return (
		<Popover
			placement="bottom"
			content={<Button onClick={handleLoginOut}>退出登录</Button>}
		>
			<Space className={styles.drop}>
				<Avatar size={32} src={globalState?.userInfo?.headImgUrl} />
				<Typography.Text>{globalState?.userInfo?.nickName}</Typography.Text>
			</Space>
		</Popover>
	)
}

export default HeaderRight
