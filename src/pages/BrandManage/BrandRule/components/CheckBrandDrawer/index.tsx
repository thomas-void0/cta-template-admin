import ProDrawer from '@/components/ProDrawer'
import { DrawerProps } from 'antd'
import styles from './indx.module.css'

export interface CheckBrandDrawerProps {
	a?: 1
}
/** 查看品牌规则 抽屉 */
const CheckBrandDrawer = (props: DrawerProps & CheckBrandDrawerProps) => {
	return (
		<ProDrawer {...props} className={styles.drawerBox}>
			<p className={styles.drawerTitle}>查看品牌规则</p>
			<div className={styles.brandHead}>
				<div className={styles.headLeft}>
					<img src="" />
					<div className={styles.brandName}>
						<span>卡萨帝</span>
						<span>卡萨帝 让高端衣物护理回归家庭</span>
					</div>
					<span className={styles.brandTag}>家用电器-大家电</span>
				</div>
				<div className={styles.headRight}>
					<span className={styles.included}>已收录</span>
					<div className={styles.operation}>
						<span>编辑123</span>
						<span>保存</span>
					</div>
				</div>
			</div>
			{/* 品牌信息 */}
			<div className={styles.brandInfo}>
				<p className={styles.smallTitle}>品牌信息</p>
				<div className={styles.brandInfoHead}>
					<span>小红书报备品牌号&nbsp;&nbsp;5个</span>
					<span>编辑</span>
				</div>
			</div>
		</ProDrawer>
	)
}

export default CheckBrandDrawer
