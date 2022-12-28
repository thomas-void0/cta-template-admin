import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { ComponentType } from 'react'
import { Items } from '@/core/context/router'
import { Merge } from '../type'
import { useRouteConfig } from '..'

type Location = ReturnType<typeof useLocation>
type DefaultParams = ReturnType<typeof useParams>
type Navigate = ReturnType<typeof useNavigate>

export interface RouteComponentProps<T = DefaultParams> {
	history: {
		back: () => void
		goBack: () => void
		location: Location
		push: (url: string, state?: any) => void
	}
	location: Location
	match: {
		params: T
	}
	params: T
	navigate: Navigate
	leftItems: Items
	topItems: Items
}

function withRouter<Props, Params = DefaultParams>(
	Component: ComponentType<Merge<Props, RouteComponentProps<Params>>>
) {
	function ComponentWithRouterProp(props: Props) {
		const location = useLocation()
		const navigate = useNavigate()
		const params = useParams()
		const match = { params }
		const { leftItems, topItems } = useRouteConfig()
		const history = {
			back: () => navigate(-1),
			goBack: () => navigate(-1),
			location,
			push: (url: string, state?: any) => navigate(url, { state }),
			replace: (url: string, state?: any) =>
				navigate(url, {
					replace: true,
					state
				})
		}

		return (
			// @ts-ignore
			<Component
				{...props}
				leftItems={leftItems}
				topItems={topItems}
				history={history}
				location={location}
				match={match}
				params={params}
				navigate={navigate}
			/>
		)
	}

	return ComponentWithRouterProp
}

export default withRouter
