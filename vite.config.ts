import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    svgr(),
    VitePWA({ registerType: "autoUpdate" })
  ],
  optimizeDeps: {
    include: ["styled-components"],
  },
  ssr: {
    noExternal: ['styled-components'],
  },
});
