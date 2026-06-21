import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://alyonsdentherapy.com",
  trailingSlash: "never",
  integrations: [react(), sitemap()],
});
