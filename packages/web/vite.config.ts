import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "path";
import runableAnalyticsPlugin from "./vite/__plugins/runable-analytics-plugin";
import honoDevPlugin from "./vite/__plugins/hono-dev-plugin";
import assetOptimizerPlugin from "./vite/__plugins/asset-optimizer-plugin";
import ports from "../../__ports.cjs";

const root = path.resolve(__dirname, "../..");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "");
  Object.assign(process.env, env);

  return {
    base: mode === "github-pages" ? "/colour-lab-hair-studio/" : "/",
    // All env files live at the repo root — keep Vite's own env loading there too,
    // so packages/web/.env* files can never shadow the root .env.
    envDir: root,
    plugins: [
      honoDevPlugin(),
      react(),
      runableAnalyticsPlugin(),
      tailwind(),
      assetOptimizerPlugin(),
      {
        name: "github-pages-metadata",
        transformIndexHtml: {
          order: "post",
          handler(html) {
            if (mode !== "github-pages") return html;
            const url = "https://ruans-web-design.github.io/colour-lab-hair-studio/";
            return html
              .replace('src="/runable.js"', 'src="/colour-lab-hair-studio/runable.js"')
              .replace(
                /content="\/(?:colour-lab-hair-studio\/)?images\/hero-balayage.jpg"/g,
                `content="${url}images/hero-balayage.jpg"`,
              )
              .replace('"@type": "HairSalon",', `"@type": "HairSalon", "url": "${url}",`)
              .replace(
                "</head>",
                `<link rel="canonical" href="${url}"><meta property="og:url" content="${url}"></head>`,
              );
          },
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/web"),
      },
    },
    server: {
      port: ports.website,
      strictPort: true,
      allowedHosts: true,
      hmr: { overlay: false },
      cors: false,
    },
  };
});
