import { FC } from 'react'
import './index.css'

export interface CubeLoadingProps {
	loading?: boolean
}
const CubeLoading: FC<CubeLoadingProps> = ({ loading }) => {
	if (!loading) return <></>
	return (
		<div className="cube-spinner-box">
			<div className="cube-spinner">
				<div className="cube1"></div>
				<div className="cube2"></div>
			</div>
		</div>
	)
}

export default CubeLoading
