import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "game-doctor",
      fileName: (format: any) => `index.${format}.js`,
    },
  }
})
