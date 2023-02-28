import { FC } from 'react'
import './index.css'

export interface RectLoadingProps {
	loading?: boolean
}
const RectLoading: FC<RectLoadingProps> = ({ loading }) => {
	if (!loading) return <></>
	return (
		<div className="rect-spinner-box">
			<div className="rect-spinner">
				<div className="rect1"></div>
				<div className="rect2"></div>
				<div className="rect3"></div>
				<div className="rect4"></div>
				<div className="rect5"></div>
			</div>
		</div>
	)
}

export default RectLoading
