import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: function (id) {
                    // Crea chunks separados para las dependencias más grandes
                    if (id.includes('node_modules')) {
                        if (id.includes('recharts')) {
                            return 'vendor_recharts';
                        }
                        if (id.includes('@tanstack/react-table')) {
                            return 'vendor_react-table';
                        }
                        // Mantenemos react-router-dom separado
                        if (id.includes('react-router-dom') || id.includes('react-router')) {
                            return 'vendor_react-router';
                        }
                        // CRÍTICO: Eliminamos la separación manual de 'react' y 'react-dom'.
                        // Esto asegura que el núcleo de React se inicialice correctamente
                        // y evita el error 'createContext is undefined'.
                        if (id.includes('@supabase')) {
                            return 'vendor_supabase';
                        }
                        // Agrupa el resto de vendors en un chunk genérico
                        return 'vendor';
                    }
                },
            },
        },
    },
    preview: {
        host: true,
        allowedHosts: ['n8n-dashboard2.mv7mvl.easypanel.host']
    }
});
