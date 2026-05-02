import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteVerification = env.VITE_GOOGLE_SITE_VERIFICATION;

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      {
        // Injects <meta name="google-site-verification"> when the env var is set.
        // Marker placeholder lives in index.html and is replaced at build time.
        name: 'inject-search-console-meta',
        transformIndexHtml(html) {
          if (!siteVerification) {
            return html.replace('<!-- %SEARCH_CONSOLE% -->', '');
          }
          return html.replace(
            '<!-- %SEARCH_CONSOLE% -->',
            `<meta name="google-site-verification" content="${siteVerification}" />`,
          );
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
