import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default ({ mode }) => {
  // cargamos todas las VITE_* y LARAVEL_* variables de entorno
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    resolve: {
      // para poder hacer imports absolutos: `import Foo from '@/components/Foo'`
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        // todo `/api/*` lo pasamos a tu backend Laravel
        '/api': {
          target: env.VITE_API_URL || 'http://127.0.0.1:8000',
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api/, '/api'),
        },
      },
    },
  });
};
