import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    base: "./",
    server: {
        port: 8889,
        cors: true,
        hmr: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8686/ql/chat/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
    },
})
