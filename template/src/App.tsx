import { ConfigProvider } from 'antd'
import { Create } from './core'
import zhCN from 'antd/es/locale/zh_CN'
import { FC } from 'react'
import theme from './config/theme'
import '@/assets/style/index.css'

const App: FC<{}> = () => {
	return (
		<ConfigProvider locale={zhCN} theme={theme}>
			{/* <div className="tw-border-line tw-bg-primary tw-text-tc-secondary/50">123</div> */}
			<Create />
		</ConfigProvider>
	)
}

export default App
