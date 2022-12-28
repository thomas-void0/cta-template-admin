import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	envPrefix: 'VITE_',
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }]
	},
	plugins: [react()],
	server: {
		host: 'dev.e.newrank.cn',
		port: 3000,
		open: true
	}
})
