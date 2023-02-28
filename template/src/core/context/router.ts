import { createContext, useContext } from 'react'

import { ItemType } from 'antd/lib/menu/hooks/useItems'

export type Items = ItemType[]

export type RouteConfigContext = {
	leftItems: Items
	topItems: Items
}

const routesContext = createContext<RouteConfigContext>({
	leftItems: [],
	topItems: []
})

export const { Provider } = routesContext

export function useRouteConfig() {
	return useContext(routesContext)
}
