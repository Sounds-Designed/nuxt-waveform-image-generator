// Nuxt UI Theme Config
export default defineAppConfig({
  appName: "Waveform Image Generator Playground",
  ui: {
    main: {
      base: "min-h-[calc(100vh-calc(calc(var(--spacing)*27)+var(--ui-header-height)))] lg:min-h-[calc(100vh-calc(56px+var(--ui-header-height)))]",
    },
    pageBody: {
      base: 'mt-8 pb-4 space-y-12'
    }
  },
});
