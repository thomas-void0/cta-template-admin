import { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import { InitialStateType, Provider, initGlobalState } from '../context/global'

import accessFactory from '@/config/access'
import { getInitialState } from '@/config/core'

export interface GlobalProviderProps {
	children: ReactNode
}

const GlobalProvider: FC<GlobalProviderProps> = props => {
	const { children } = props
	const [globalState, setGlobalState] = useState<InitialStateType>(initGlobalState)

	useEffect(() => {
		getInitialState().then(values => {
			// 获取路由权限
			const routeAccess = accessFactory(values)
			// 设置共享全局状态
			setGlobalState({ ...values, routeAccess })
		})
	}, [])

	const globalValue = useMemo(
		() => ({
			globalState,
			dispatch: setGlobalState
		}),
		[globalState]
	)

	return <Provider value={globalValue}>{children}</Provider>
}

export default GlobalProvider
