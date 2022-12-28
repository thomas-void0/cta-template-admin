// import BeforeRouter from '../Router/BeforeRouter'
import { FC } from 'react'
import GlobalProvider from '../Global'
import RouterView from '../Router/RouterView'
import BeforeRouter from '../Router/BeforeRouter'

// 创建

const Create: FC<any> = () => {
	return (
		<GlobalProvider>
			<BeforeRouter>
				<RouterView />
			</BeforeRouter>
		</GlobalProvider>
	)
}

export default Create
