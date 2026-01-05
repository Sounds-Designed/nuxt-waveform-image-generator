// Nuxt UI Theme Config
export default defineAppConfig({
  appName: "Waveform Image Generator Playground",
  ui: {
    main: {
      base: "min-h-[calc(100vh-calc(calc(var(--spacing)*27)+var(--ui-header-height)))] lg:min-h-[calc(100vh-calc(calc(var(--spacing)*13)+var(--ui-header-height)))]",
    },
  },
});
