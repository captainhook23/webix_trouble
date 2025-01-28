import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 6067,
        host: true,
    },
    build: {
        minify: true,
        lib: {
            entry: 'sources/index.js',
            name: 'app',
            fileName: 'app',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['webix-jet'],
            output: {
                inlineDynamicImports: true,
                assetFileNames: 'assets/[name].[ext]',
                chunkFileNames: 'assets/[name].js',
                entryFileNames: 'assets/[name].js',
            },
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './tests/setup.js',
    },
});
