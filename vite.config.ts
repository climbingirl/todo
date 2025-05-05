import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prettyModuleClassnames from 'vite-plugin-pretty-module-classnames';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prettyModuleClassnames()],
});
