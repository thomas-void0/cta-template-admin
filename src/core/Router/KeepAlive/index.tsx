// keep-alive实现
import routes from '@/routes'
import {
	Dispatch,
	JSXElementConstructor,
	ReactElement,
	RefObject,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'

import { createPortal } from 'react-dom'
import { useLocation } from 'react-router'
import { searchRoute } from '../utils'

export interface CacheEle {
	key: string
	ele: ReactElement<any, string | JSXElementConstructor<any>> | null
}

interface DefaultProps {
	children: ReactElement<any, string | JSXElementConstructor<any>> | null
	maxLength?: number
}

interface AdditionalProps extends DefaultProps {
	children: ReactElement<any, string | JSXElementConstructor<any>> | null
	maxLength?: number
	cacheEleList: CacheEle[]
	setCacheEleList: Dispatch<React.SetStateAction<CacheEle[]>>
}

export type KeepAliveProps = DefaultProps | AdditionalProps

function KeepAlive(props: DefaultProps): JSX.Element
function KeepAlive(props: AdditionalProps): JSX.Element
function KeepAlive(props: KeepAliveProps) {
	const { children, maxLength = 10 } = props
	const { pathname } = useLocation()

	// 缓存的元素节点数组
	const [internalCacheEleList, setInternalCacheEleList] = useState<CacheEle[]>([])

	// keepAlive容器
	const keepAliveContainer = useRef<HTMLDivElement>(null)
	// 是否受控
	const cacheEleList = 'cacheEleList' in props ? props.cacheEleList : internalCacheEleList
	const setCacheEleList =
		'setCacheEleList' in props ? props.setCacheEleList : setInternalCacheEleList

	const isNonKeepAlive = useMemo(() => {
		const layoutRoutes = routes.find(item => item.path === '/*')?.children || []
		const { keepAlive } = searchRoute(location.pathname, layoutRoutes)
		return !keepAlive
	}, [pathname])

	useEffect(() => {
		if (!children || isNonKeepAlive) return

		setCacheEleList(cacheList => {
			const nextCacheList = [...cacheList]
			// 如果超出限制，删除第一个
			if (cacheList.length >= maxLength) {
				nextCacheList.shift()
			}

			const isPush = nextCacheList.findIndex(item => item.key === pathname) === -1

			// 添加新的元素
			isPush &&
				nextCacheList.push({
					key: pathname,
					ele: children
				})
			return nextCacheList
		})
	}, [children, maxLength])

	return (
		<>
			{/* 此路由无需保持keepalive */}
			{isNonKeepAlive && children}
			<div ref={keepAliveContainer}></div>
			{/* 渲染当前的所有缓存元素 */}
			{cacheEleList.map(item => (
				<Component
					key={item.key}
					active={item.key === pathname}
					container={keepAliveContainer}
				>
					{item.ele}
				</Component>
			))}
		</>
	)
}

// 渲染组件
interface ComponentProps {
	active: boolean
	container: RefObject<HTMLDivElement>
	children: ReactElement<any, string | JSXElementConstructor<any>> | null
}
function Component(props: ComponentProps) {
	const [targetElement] = useState(() => document.createElement('div'))
	const { container, active, children } = props

	useEffect(() => {
		active
			? container.current?.appendChild(targetElement)
			: container.current?.removeChild(targetElement)
	}, [active])

	return <>{createPortal(children, targetElement)}</>
}

export default KeepAlive
