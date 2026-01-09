<script setup lang="ts">
import type { ILinearWaveformComponentProps } from '../types';

withDefaults(defineProps<ILinearWaveformComponentProps>(), { height: 300, width: 400});
</script>

<template>
  <svg :viewBox="`0 0 ${width} ${height}`">
    <rect :fill="backgroundColor" :opacity="backgroundOpacity" x="0" y="0" :width="width" :height="height" />
  </svg>
</template>
