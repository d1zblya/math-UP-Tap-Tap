import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [
        react(),
    ],
    server: {
        allowedHosts: [
            '1b593e058ff97756232bb73f00155c38.serveo.net',
        ],
    },
});