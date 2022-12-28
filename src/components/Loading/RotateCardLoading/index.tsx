// 卡片类型加载效果
import { FC } from 'react'
import styles from './index.module.css'

export interface RotateCardLoadingProps {
	loading?: boolean
}

const RotateCardLoading: FC<RotateCardLoadingProps> = props => {
	return (
		<div className={styles.rotateCard}>
			{props.loading && <div className={styles.spinner}></div>}
		</div>
	)
}

export default RotateCardLoading
