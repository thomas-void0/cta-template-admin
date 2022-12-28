import { Drawer, DrawerProps } from 'antd'
import React, { useMemo } from 'react'

import { CloseOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import styles from './index.module.css'
import { useSize } from 'ahooks'
import { breakpoints } from '@/config/theme'

// 封装ProDrawer
const ProDrawer: React.FC<
	DrawerProps & {
		children?: React.ReactNode
	}
> = props => {
	const { open, className, size, ...rest } = props

	const bodySize = useSize(document.body)

	const width = useMemo(() => {
		const w = bodySize?.width || 0

		// 优先考虑size
		if (size === 'large') {
			return breakpoints.lg
		}

		if (w <= 1960) {
			return breakpoints.sm
		}

		return breakpoints.md
	}, [bodySize?.width, size])

	return (
		<Drawer
			closeIcon={
				<div
					className={styles.handler}
					onClick={e => {
						props?.onClose?.(e)
					}}
				>
					<CloseOutlined
						className={styles.closeIcon}
						style={{
							fontSize: 20,
							color: '#fff'
						}}
					/>
				</div>
			}
			open={open}
			className={classNames(className, styles.drawer)}
			maskClosable={false}
			width={width}
			{...rest}
		>
			{props.children}
		</Drawer>
	)
}

export default React.memo(ProDrawer)
