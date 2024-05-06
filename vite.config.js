import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    base: "./",
    server: {
        port: 8888,
        cors: true,
        hmr: true,
        proxy: {
            '/api': {
                target: 'http://1.12.220.218:8585/cat',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
    },
})
