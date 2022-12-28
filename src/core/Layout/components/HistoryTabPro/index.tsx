// 浏览足迹页签

import { TabsProps } from 'antd'
import { Dispatch, useEffect, useMemo, useRef, useState } from 'react'
import routes from '@/routes'
import styles from './index.module.css'
import classNames from 'classnames'
import { cloneDeep, isEmpty } from 'lodash-es'
import { useClickAway, useSize } from 'ahooks'
import { CacheEle } from '@/core/Router/KeepAlive'
import { CloseOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import withRouter from '@/core/Router/withRouter'
import { searchRoute } from '@/core/Router/utils'

type OperationType = 'RELOAD' | 'CLOSE' | 'CLOSE_LEFT' | 'CLOSE_RIGHT' | 'CLOSE_OTHER'

type GetArrayValue<T> = T extends (infer P)[] ? P : never

type Item = GetArrayValue<Required<TabsProps>['items']>

export interface HistoryTabProProps {
	cacheEleList: CacheEle[]
	setCacheEleList: Dispatch<React.SetStateAction<CacheEle[]>>
}

const HistoryTabPro = withRouter<HistoryTabProProps>(props => {
	const { location, navigate, cacheEleList, setCacheEleList } = props

	const tabsRef = useRef(null)

	const { pathname } = location

	const [activeKey, setActiveKey] = useState(pathname)
	const [items, setItems] = useState<Item[]>([])
	const [pos, setPos] = useState<{ x: number; y: number }>()

	useClickAway(() => setPos(undefined), tabsRef, ['mousedown'])

	const size = useSize(tabsRef)

	useEffect(() => {
		// 判断是否添加
		const idx = items.findIndex(item => item.key === pathname)
		if (idx === -1) {
			const route = searchRoute(pathname, routes)
			const { name, element } = route
			if (!name || !element) return
			const o = {
				key: pathname,
				label: name
			}
			const _items = [...items, o]
			setItems(_items)
		}
		setActiveKey(pathname)
	}, [pathname])

	const onChange = (newActiveKey: string) => {
		pos && setPos(undefined)
		setActiveKey(newActiveKey)
		navigate(newActiveKey)
	}

	const remove = (targetKey: string) => {
		let newActiveKey = activeKey
		let lastIndex = -1
		items.forEach((item, i) => {
			if (item.key === targetKey) {
				lastIndex = i - 1
			}
		})
		const newPanes = items.filter(item => item.key !== targetKey)
		if (newPanes.length && newActiveKey === targetKey) {
			newActiveKey = lastIndex >= 0 ? newPanes[lastIndex].key : newPanes[0].key
		}
		setItems(newPanes)
		setActiveKey(newActiveKey)
		navigate(newActiveKey)
		// 删除缓存的dom
	}

	function onContextChange(event: any, item: Item) {
		event.preventDefault()
		// 如果不是当前活跃的tab，不弹出菜单
		if (item.key !== pathname) return
		const { pageX, pageY } = event
		setPos({
			x: pageX,
			y: pageY
		})
	}

	const OPERATION_MAP = new Map([
		[
			'RELOAD',
			() => {
				const newList = [...cacheEleList]
				const idx = newList.findIndex(cache => cache.key === pathname)
				if (~idx) {
					const tem = cloneDeep(newList[idx])
					newList[idx] = tem
					setCacheEleList(newList)
				} else {
					navigate('/')
					setTimeout(() => navigate(pathname), 0)
				}
			}
		],
		[
			'CLOSE',
			() => {
				// 删除此tab
				remove(pathname)
				// 清除缓存
				const newList = [...cacheEleList]
				const idx = newList.findIndex(cache => cache.key === pathname)
				newList.splice(idx, 1)
				setCacheEleList(newList)
			}
		],
		[
			'CLOSE_LEFT',
			() => {
				const _items = [...items]
				const idx = _items.findIndex(item => item.key === pathname)
				const newItems = _items.slice(idx)
				// 清除缓存
				const newList = [...cacheEleList].filter(cache =>
					newItems.find(item => item.key === cache.key)
				)
				setItems(newItems)
				setCacheEleList(newList)
			}
		],
		[
			'CLOSE_RIGHT',
			() => {
				const _items = [...items]
				const idx = _items.findIndex(item => item.key === pathname)
				const newItems = _items.slice(0, idx + 1)
				// 清除缓存
				const newList = [...cacheEleList].filter(cache =>
					newItems.find(item => item.key === cache.key)
				)
				setItems(newItems)
				setCacheEleList(newList)
			}
		],
		[
			'CLOSE_OTHER',
			() => {
				const _items = [...items]
				const idx = _items.findIndex(item => item.key === pathname)
				const newItems = [_items[idx]]
				// 清除缓存
				const cache = [...cacheEleList].find(cache => cache.key === pathname)
				setItems(newItems)
				setCacheEleList(cache ? [cache] : [])
			}
		]
	])

	function handleOperation(type: OperationType) {
		setPos(undefined)
		const fn = OPERATION_MAP.get(type)
		fn?.()
	}
	// 是否可以关闭此卡片
	const disabledClose = items.length <= 1
	// 是否禁用关闭左侧
	const disabledCloseLeft = items[0]?.key === pathname
	// 是否禁用关闭右侧
	const disabledCloseRight = items.at(-1)?.key === pathname
	// 是否禁用关闭其他
	const disabledCloseOther = items.length <= 1

	const computedWidth = useMemo(() => {
		const num = items.length
		const allWidth = size?.width ?? 0
		const cell = allWidth / num
		return cell - 6
	}, [size, items])

	// 列表组件
	const List = () =>
		items.map((item, index) => (
			<Draggable key={item.key} draggableId={item.key} index={index}>
				{provided => (
					<div
						ref={provided.innerRef}
						className={classNames(styles.item, item.key === activeKey && styles.checked)}
						style={{ maxWidth: `${computedWidth}px` }}
						onContextMenu={e => onContextChange(e, item)}
						onClick={() => item.key !== pathname && onChange(item.key)}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<div className="tw-truncate">{item.label}</div>
						{!!index && (
							<CloseOutlined
								className={styles.closeIcon}
								onClick={e => {
									e.stopPropagation()
									remove(item.key)
								}}
							/>
						)}
					</div>
				)}
			</Draggable>
		))

	const reorder = (list: Item[], startIndex: number, endIndex: number) => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)

		return result
	}

	// 监听拖拽移动
	function onDragEnd(result: Record<string, any>) {
		if (!result.destination) return

		const endIdx = result.destination.index
		const startIdx = result.source.index

		if (startIdx === endIdx) return

		const newItems = reorder(items, startIdx, endIdx)
		setItems(newItems)
	}

	return (
		<>
			<div className={styles.tabsPro} ref={tabsRef}>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="group" direction="horizontal">
						{provided => (
							<div
								ref={provided.innerRef}
								className={styles.group}
								{...provided.droppableProps}
							>
								{/* @ts-ignore */}
								<List />
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>

				<div
					className={classNames(styles.contextMenu, isEmpty(pos) && styles.hide)}
					style={isEmpty(pos) ? {} : { top: pos.y, left: pos.x }}
				>
					<div onClick={() => handleOperation('RELOAD')}>刷新</div>
					<div
						className={classNames(disabledClose && styles.disabled)}
						onClick={() => handleOperation('CLOSE')}
					>
						关闭
					</div>
					<div
						className={classNames(disabledCloseLeft && styles.disabled)}
						onClick={() => !disabledCloseLeft && handleOperation('CLOSE_LEFT')}
					>
						关闭左侧
					</div>
					<div
						className={classNames(disabledCloseRight && styles.disabled)}
						onClick={() => !disabledCloseRight && handleOperation('CLOSE_RIGHT')}
					>
						关闭右侧
					</div>
					<div
						className={classNames(disabledCloseOther && styles.disabled)}
						onClick={() => !disabledCloseOther && handleOperation('CLOSE_OTHER')}
					>
						关闭其他
					</div>
				</div>
			</div>
		</>
	)
})

export default HistoryTabPro
