import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// SINGLE=1 npm run build → dist/index.html as one self-contained file
// (all JS/CSS/fonts inlined) that opens by double-click, no server needed.
export default defineConfig(({ mode }) => {
  const single = process.env.SINGLE === '1'
  return {
    base: './',
    plugins: [react(), tailwindcss(), ...(single ? [viteSingleFile()] : [])],
    build: single ? { assetsInlineLimit: 100_000_000, chunkSizeWarningLimit: 10_000 } : {},
  }
})
