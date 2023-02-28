import { FC, useState } from 'react'
import KeepAlive, { CacheEle, KeepAliveProps } from '@/core/Router/KeepAlive'
import { Content } from 'antd/es/layout/layout'
import { useRoutes } from 'react-router'
import HistoryTabPro from '../HistoryTabPro'
import styles from './index.module.css'

export interface ContentProProps {
	isTabs?: boolean
	maxLength?: KeepAliveProps['maxLength']
	children: ReturnType<typeof useRoutes>
}

const ContentPro: FC<ContentProProps> = props => {
	const { isTabs, maxLength, children } = props

	// 缓存的元素节点数组
	const [cacheEleList, setCacheEleList] = useState<CacheEle[]>([])

	return (
		<div className={styles.content}>
			{isTabs && (
				<HistoryTabPro cacheEleList={cacheEleList} setCacheEleList={setCacheEleList} />
			)}
			<Content>
				<KeepAlive
					cacheEleList={cacheEleList}
					setCacheEleList={setCacheEleList}
					maxLength={maxLength}
				>
					{children}
				</KeepAlive>
			</Content>
		</div>
	)
}

export default ContentPro
