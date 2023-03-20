import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import legacy from '@vitejs/plugin-legacy'
import proxyTarget from './src/config/proxy'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		envPrefix: 'VITE_',
		resolve: {
			alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }]
		},
		plugins: [
			react(),
			svgrPlugin({
				svgrOptions: { icon: true }
			}),
			mode === 'production' &&
				legacy({ modernPolyfills: true, renderLegacyChunks: false })
		].filter(Boolean),
		server: {
			host: '127.0.0.1',
			port: 3000,
			open: true,
			proxy: {
				'/user': {
					target: proxyTarget.user,
					changeOrigin: true,
					ws: true
				}
			}
		},
		build: {
			target: 'es2015',
			reportCompressedSize: false,
			chunkSizeWarningLimit: 2000,
			sourcemap: mode !== 'production',
			minify: 'esbuild'
		}
	}
})
