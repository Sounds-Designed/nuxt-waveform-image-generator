<script setup lang="ts">
import { computed, type Component, type ComputedRef, type SVGAttributes } from 'vue';
import LinearWaveformImage from './LinearWaveformImage.vue';
import PolarWaveformImage from './PolarWaveformImage.vue';
import SnakeWaveformImage from './SnakeWaveformImage.vue';

interface WaveformImageProps {
  audioBuffer: AudioBuffer,
  variant?: "linear" | "polar" | "snake",
  backgroundColor?: string | null;
  backgroundOpacity?: SVGAttributes["opacity"];
  color?: SVGAttributes["stroke"];
  height?: number;
  width?: number;
  horizontalPadding?: number;
  verticalPadding?: number;
  samples?: number;
  pathHeightScale?: number;
  pathWidthScale?: number;
  thickness?: number;
  normalize?: boolean;
}

type ChildWaveformImageProps = Omit<WaveformImageProps, "variant">;

const props = withDefaults(defineProps<WaveformImageProps>(), { backgroundColor: "#fefefe", backgroundOpacity: 0, color: undefined, variant: "linear", normalize: false, height: 300, width: 400, horizontalPadding: 0, verticalPadding: 0, samples: 1, pathHeightScale: 1, pathWidthScale: 1, thickness: 1 })

const childProps: ComputedRef<ChildWaveformImageProps> = computed((): ChildWaveformImageProps => {
  return props as ChildWaveformImageProps
})

const component = computed((): Component => {
  let component = LinearWaveformImage;

  switch (props.variant) {
    case "polar":
      component = PolarWaveformImage;
      break;
    case "snake":
      component = SnakeWaveformImage;
      break;
  }

  return component;
})
</script>

<template>
  <div :style="{ 'aspect-ratio': `${width} / ${height}` }" class="w-full">
    <component :is="component" :audio-buffer="audioBuffer" :height="height" :width="width" />
  </div>
</template>
