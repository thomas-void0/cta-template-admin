import { getEnv } from '../utils'

const env = getEnv()

interface configData {
	loginUrl: string
}
let config = null

if (env === 'development' || env === 'test') {
	config = {
		loginUrl: `https://login.normal.cn`
	}
} else if (env === 'production') {
	config = {
		loginUrl: `https://login.production.cn`
	}
}

export default config as configData
