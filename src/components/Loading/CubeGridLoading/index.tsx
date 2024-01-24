import { FC } from 'react'
import './index.css'

export interface CubeGridLoadingProps {
	loading?: boolean
}
const CubeGridLoading: FC<CubeGridLoadingProps> = ({ loading }) => {
	if (!loading) return <></>
	return (
		<div className="sk-cube-grid-box">
			<div className="sk-cube-grid">
				<div className="sk-cube sk-cube1"></div>
				<div className="sk-cube sk-cube2"></div>
				<div className="sk-cube sk-cube3"></div>
				<div className="sk-cube sk-cube4"></div>
				<div className="sk-cube sk-cube5"></div>
				<div className="sk-cube sk-cube6"></div>
				<div className="sk-cube sk-cube7"></div>
				<div className="sk-cube sk-cube8"></div>
				<div className="sk-cube sk-cube9"></div>
			</div>
		</div>
	)
}

export default CubeGridLoading
