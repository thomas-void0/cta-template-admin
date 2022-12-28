/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_NODE_ENV: 'development' | 'test' | 'production'
	readonly VITE_PREFIX_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
