import { FC } from 'react'
import './index.css'

export interface ChaseLoadingProps {
	loading?: boolean
}
const ChaseLoading: FC<ChaseLoadingProps> = ({ loading }) => {
	if (!loading) return <></>
	return (
		<div className="chase-loading-box">
			<div className="sk-chase">
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
			</div>
		</div>
	)
}

export default ChaseLoading
