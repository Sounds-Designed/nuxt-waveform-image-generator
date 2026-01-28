import { onMounted, onUnmounted, reactive, toValue, watch, type Reactive, type Ref } from "vue";
import type { WaveformCustomizationOptions } from "../types";
import { DefaultCustomizerOptions } from "../constants";

export function useWaveformImageCustomizer(
  _options: Partial<WaveformCustomizationOptions> | Ref<Partial<WaveformCustomizationOptions>> = {},
): {
  options: WaveformCustomizationOptions,
  backupOptions: () => void,
  getOptions: () => WaveformCustomizationOptions,
  getBackupOptions: () => WaveformCustomizationOptions,
  resetOptions: () => void
} {
  const options: Reactive<WaveformCustomizationOptions> = reactive(Object.assign({}, DefaultCustomizerOptions, toValue(_options)))

  const optionsBackup: WaveformCustomizationOptions = Object.assign({}, options);

  const backupOptions = () => {
    const keys = Object.keys(optionsBackup) as Array<keyof WaveformCustomizationOptions>

    // @ts-ignore
    for (const key of keys) optionsBackup[key] = options[key]
  }

  const resetOptions = () => {
    const keys = Object.keys(options) as Array<keyof WaveformCustomizationOptions>

    // @ts-ignore
    for (const key of keys) options[key] = optionsBackup[key]
  }

  const getOptions = (): WaveformCustomizationOptions => {
    return { ...options }
  }

  const getBackupOptions = (): WaveformCustomizationOptions => {
    return { ...optionsBackup }
  }

  let _onOptionsUpdated: Function | undefined;

  onMounted(() => {
    if(options.onOptionsUpdated) {
      // @ts-ignore
      _onOptionsUpdated = watch(options, options.onOptionsUpdated)
    }
  })

  onUnmounted(() => {
    if(_onOptionsUpdated) _onOptionsUpdated(options)
  })

  return { options, backupOptions, resetOptions, getOptions, getBackupOptions }
}
