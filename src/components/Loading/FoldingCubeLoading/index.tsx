import { FC } from 'react'
import './index.css'

export interface FoldingCubeLoadingProps {
	loading?: boolean
}
const FoldingCubeLoading: FC<FoldingCubeLoadingProps> = ({ loading }) => {
	if (!loading) return <></>
	return (
		<div className="sk-folding-cube-box">
			<div className="sk-folding-cube">
				<div className="sk-cube1 sk-cube"></div>
				<div className="sk-cube2 sk-cube"></div>
				<div className="sk-cube4 sk-cube"></div>
				<div className="sk-cube3 sk-cube"></div>
			</div>
		</div>
	)
}

export default FoldingCubeLoading
