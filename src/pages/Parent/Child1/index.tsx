// Child1
import { Input } from 'antd'
import { FC } from 'react'

const Child1: FC<{}> = () => {
	return (
		<>
			<div className="tw-bg-primary tw-font-bold">开启了keepAlive</div>
			<Input placeholder="请输入" />
		</>
	)
}

export default Child1
