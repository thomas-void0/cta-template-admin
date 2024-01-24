import { createContext, useContext } from 'react'

export type GlobalContext = {
	globalState: InitialStateType
	dispatch: (state: InitialStateType) => void
}

// 初始化状态值
export type InitialStateType = {
	userInfo?: Record<string, any>
	accessInfo?: string[]
	routeAccess?: Record<string, boolean>
	[propKey: string]: any
}

export const initGlobalState = { settings: {} }

const context = createContext<GlobalContext>({
	globalState: initGlobalState,
	dispatch: () => {}
})

export const { Provider } = context

export function useGlobal() {
	return useContext(context)
}
