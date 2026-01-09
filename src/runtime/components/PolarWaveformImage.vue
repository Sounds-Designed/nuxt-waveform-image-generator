<script setup lang="ts">
import type { IPolarWaveformComponentProps } from '../types';

const props = withDefaults(defineProps<IPolarWaveformComponentProps>(), { height: 300, width: 400});
</script>

<template>
  <svg :viewBox="`${-(width / 2)} ${-(height / 2)} ${width} ${height}`">
    <rect :fill="props.backgroundColor" :x="-(width / 2)" :y="-(height / 2)" :width="width" :height="height" />
  </svg>
</template>
