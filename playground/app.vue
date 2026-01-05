<script setup>
import "~/assets/scss/app.scss";
import { getAudioBufferFromURL } from "@sounds-designed/audio-to-image-utils";
import AudioFile from "~/assets/audio/test-kick-1.wav";

const audioBuffer = ref(null);

onMounted(async () => {
  audioBuffer.value = await getAudioBufferFromURL(AudioFile)
})

const items = computed(() => [
  {
    label: "Home",
    icon: "i-lucide-home",
    to: { name: "index" },
    children: [],
  },
  {
    label: "Waveforms",
    icon: "i-lucide-audio-waveform",
    children: [
      {
        label: "Linear Paths",
        icon: "i-lucide-audio-lines",
        to: { name: "linear-paths" },
      },
      {
        label: "Polar Paths",
        icon: "i-lucide-radius",
        to: { name: "polar-paths" },
      },
    ],
  },
]);
</script>

<template>
  <UApp>
    <UHeader :ui="{ left: 'lg:flex-initial', container: 'gap-8', center: 'grow', title: 'text-green-alt' }"
      title="Waveform Image Generator">
      <UNavigationMenu variant="link" class="w-full" color="primary" type="single" :items="items"
        :disable-pointer-leave-close="true">
      </UNavigationMenu>

      <template #right>
        <UTooltip text="Change Colour Mode" :kbds="['meta', 'C']">
          <UColorModeButton />
        </UTooltip>
      </template>

      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
        <USeparator class="py-4" />
      </template>
    </UHeader>

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <UFooter>
      <template #left>
        <ULink :to="{ name: 'index' }" target="_blank">Sounds Designed</ULink>
        {{ new Date().getFullYear() }}
      </template>
    </UFooter>
  </UApp>
</template>
