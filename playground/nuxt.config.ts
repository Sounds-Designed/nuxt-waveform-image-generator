import ui from "@nuxt/ui/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ['../src/module', "@nuxt/eslint", "@nuxt/ui",
    "@vueuse/nuxt"],
  imports: { scan: true },
  compatibilityDate: "2025-12-15",
  devtools: { enabled: true, timeline: { enabled: true } },
  eslint: { checker: false },
  icon: { provider: "iconify", clientBundle: { scan: true } },
  postcss: { plugins: { "@tailwindcss/postcss": {} } },
  vite: { plugins: [tailwindcss(), ui()] },
  features: { inlineStyles: true },
  waveformImageGenerator: {},
})
