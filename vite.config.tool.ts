import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, "docs"),
  }
})
