import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    server: {
        allowedHosts: [
            '4736-185-77-216-5.ngrok-free.app', // Разрешаем этот хост
        ],
    },
});