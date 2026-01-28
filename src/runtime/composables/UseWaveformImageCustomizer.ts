import { onMounted, onUnmounted, reactive, toValue, watch, type Reactive, type Ref } from "vue";
import type { WaveformCustomizationOptions } from "../types";

export function useWaveformImageCustomizer(
  _options: Partial<WaveformCustomizationOptions> | Ref<Partial<WaveformCustomizationOptions>> = {},
): {
  defaults: WaveformCustomizationOptions,
  options: WaveformCustomizationOptions,
  backupOptions: () => void,
  getOptions: () => WaveformCustomizationOptions,
  getBackupOptions: () => WaveformCustomizationOptions,
  resetOptions: () => void
} {
  const _defaultOptions: WaveformCustomizationOptions = {
    animation: false,
    backgroundColor: "#FEFEFE",
    backgroundOpacity: 0,
    channel: 0,
    downsampleFactor: 64,
    frames: 10,
    height: 300,
    width: 400,
    verticalPadding: 0,
    horizontalPadding: 0,
    normalize: true,
    variant: "linear",
    type: "steps",
    lineThickness: 1,
    size: 1,
    pathHeightScale: 1,
    pathWidthScale: 1,
  };

  Object.freeze(_defaultOptions);

  const options: Reactive<WaveformCustomizationOptions> = reactive(Object.assign({}, _defaultOptions, toValue(_options)))

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

  return { defaults: _defaultOptions, options, backupOptions, resetOptions, getOptions, getBackupOptions }
}
