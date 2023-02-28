// 使用权限hook

import { useMemo } from 'react'
import { useGlobal } from '../context/global'

const useAccess = (access: string | string[]) => {
	const {
		globalState: { accessInfo }
	} = useGlobal()

	return useMemo(() => {
		// 数组情况，其中有一个存在就返回true
		return Array.isArray(access)
			? access.some(str => accessInfo?.includes(str))
			: accessInfo?.includes(access)
	}, [accessInfo])
}

export default useAccess
