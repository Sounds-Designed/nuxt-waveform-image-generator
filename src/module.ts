import { addComponent, defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { ModuleOptions } from '@nuxt/schema'

export type * from './runtime/types'

// Module options TypeScript interface definition
export interface WaveformImageGeneratorOptions extends ModuleOptions {
  enabled?: boolean;
}

export default defineNuxtModule<WaveformImageGeneratorOptions>({
  meta: {
    name: '@sounds-designed/nuxt-waveform-image-generator',
    configKey: 'waveformImageGenerator',
  },
  defaults: {
    enabled: true,
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/plugin'))
    addComponent({
      name: 'LinearWaveformImage',
      filePath: resolver.resolve('runtime/components/LinearWaveformImage.vue'),
    })

    addComponent({
      name: 'PolarWaveformImage',
      filePath: resolver.resolve('runtime/components/PolarWaveformImage.vue'),
    })

    addComponent({
      name: 'SnakeWaveformImage',
      filePath: resolver.resolve('runtime/components/SnakeWaveformImage.vue'),
    })

    addComponent({
      name: 'WaveformImage',
      filePath: resolver.resolve('runtime/components/WaveformImage.vue'),
    })
  },
})
