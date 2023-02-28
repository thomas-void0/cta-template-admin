// 用户权限box

import { FC, ReactNode } from 'react'
import useAccess from './useAccess'

export interface AccessProps {
	/* 配置的权限key */
	access: string | string[]
	children: ReactNode
}

const Access: FC<AccessProps> = props => {
	const { children, access } = props

	const visible = useAccess(access)

	return visible ? <>{children}</> : null
}

export default Access
