<script setup lang="ts">
import { getAudioBufferFromURL } from "@sounds-designed/audio-to-image-utils";
import AudioFile from "~/assets/audio/test-kick-1.wav";
import type { SelectItem, TabsItem  } from "@nuxt/ui";
import { CustomizationOptionsSchema, type CustomizationOptions } from "~/types/schemas";
import type { GradientFillAttributes, WaveformComponentComponentType } from "../../src/module";

const route = useRoute()
const router = useRouter()

const items: TabsItem[] = [
  {
    label: 'Linear',
    value: 'linear'
  },
  {
    label: 'Polar',
    value: 'polar'
  },
  {
    label: 'Snake',
    value: 'snake'
  }
]

const activeTab = ref("bespoke")

const variant = computed({
  get() {
    return options.variant || 'steps'
  },
  set(_variant) {
    options.variant = _variant
  }
})

const BlackHoodie = "/images/awdis-college-hoodie-jet-black.png";

const _defaultOptions: CustomizationOptions = {
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

const options = reactive<CustomizationOptions>({ ..._defaultOptions });

const audioBuffer: Ref<AudioBuffer | null> = ref(null);

const fill: Ref<string | GradientFillAttributes[]> = ref([
  { offset: 0, style: "stop-color:rgb(0,255,10);stop-opacity:1.00" },
  { offset: 25, style: "stop-color:rgb(0,188,212);stop-opacity:0.70" },
  { offset: 50, style: "stop-color:rgb(238,130,238);stop-opacity:1.00" },
  { offset: 75, style: "stop-color:rgb(103,58,183);stop-opacity:0.70" },
  { offset: 100, style: "stop-color:rgb(233,30,99);stop-opacity:1.00" },
]);

// const fillMode: Ref<"solid" | "gradient"> = computed(() => {
//   return typeof fill.value === "string" ? "solid" : "gradient";
// });

const getSamples = (_audioBuffer: AudioBuffer | null, downsampleFactor: number) =>
  _audioBuffer ? Math.floor(_audioBuffer.length / downsampleFactor) : 1;

const samples = computed(() => getSamples(audioBuffer.value, options.downsampleFactor));

const channels: ComputedRef<SelectItem[]> = computed(() => {
  if (!audioBuffer.value) return [];

  const _channels: SelectItem[] = [];

  let c = 0;

  while (c < audioBuffer.value.numberOfChannels) {
    _channels.push({ label: (c + 1).toString(), value: c });
    c++;
  }

  return _channels;
});

type ComponentTabType = "bespoke" | "designer" | "mod" | "original"
type ComponentTab = { label: string; icon: string; slot: ComponentTabType; class?: string; value: ComponentTabType }

const tabs: Array<ComponentTab> = [
  { label: "Bespoke", icon: "i-lucide-circle-star", slot: "bespoke", value: "bespoke" },
  { label: "Designer", icon: "i-lucide-shirt", slot: "designer", class: "relative", value: "designer" },
  { label: "Modified", icon: "i-lucide-git-pull-request-draft", slot: "mod", value: "mod" },
  { label: "Original", icon: "i-lucide-git-commit-vertical", slot: "original", value: "original" },
];

const backgroundChip = computed(() => ({ backgroundColor: options.backgroundColor }));

onMounted(async () => {
  activeTab.value = route.query?.tab && tabs.findIndex(tab => tab.slot === route.query?.tab as ComponentTabType) >= 0 ? route.query?.tab as ComponentTabType : "designer"
  variant.value = route.query?.variant as WaveformComponentComponentType || "linear"

  const audioData = await getAudioBufferFromURL(AudioFile);
  audioBuffer.value = audioData;

  options.downsampleFactor = Math.min(Math.sqrt(audioData.length), 4)
});

const toast = useToast();

const onResetClicked = () => {
  toast.add({
    title: "Options Reset",
    description: "We've reset the customization options for you to start your fresh design!!",
    color: "success",
  });

  for (const optionKey of Object.keys(_defaultOptions)) {
  //   options[optionKey] = _defaultOptions[optionKey];
    console.log(optionKey, options[optionKey], _defaultOptions[optionKey])
  }

  Object.assign(options, _defaultOptions);
};

const clearActiveTabWatcher = watch(activeTab, (newTab, oldTab) => {
  if (newTab !== oldTab) router.push({ ...route, query: { ...route.query, tab: newTab } })
}, {})

const clearVariantWatcher = watch<PathComponentType>(() => options.variant as PathComponentType, (newVariant, oldVariant) => {
  if (newVariant !== oldVariant) router.push({ ...route, query: { ...route.query, variant: newVariant } })
}, {})

onUnmounted(() => {
  clearActiveTabWatcher();
  clearVariantWatcher();
})
</script>


<template>
  <UPage>
    <UContainer class="max-w-8xl">
      <UPageHeader
title="Linear Paths"
        description="A selection of linear paths that can be generated using this component" headline="Examples" />

      <USeparator class="mb-4" />

      <UPageBody>
        <div class="mb-4 grid md:grid-cols-4">
          <div>
            <UForm ref="form" :state="options" :schema="CustomizationOptionsSchema" class="flex w-60 flex-col gap-4">
              <UFormField label="Background Color">
                <UPopover>
                  <UButton label="Choose color" color="neutral" variant="outline">
                    <template #leading>
                      <span :style="backgroundChip" class="size-3 rounded-full" />
                    </template>
                  </UButton>

                  <template #content>
                    <UColorPicker v-model="options.backgroundColor" class="p-2" />
                  </template>
                </UPopover>
              </UFormField>

              <UFormField label="Background Opacity">
                <USlider v-model="options.backgroundOpacity" name="backgroundOpacity" :step="0.05" :min="0" :max="1" />
              </UFormField>

              <UFormField label="Channel">
                <USelect v-model="options.channel" :items="channels" class="w-48" />
              </UFormField>

              <UFormField label="Sample Count">
                <USlider
v-model="options.downsampleFactor" name="downsampleFactor"
                  :default-value="options.downsampleFactor"
                  :min="audioBuffer?.length ? Math.min(Math.sqrt(audioBuffer.length), 4) : 1"
                  :max="audioBuffer?.length ? audioBuffer.length / 32 : 1" />
              </UFormField>

              <UFormField label="Line Thickness">
                <USlider v-model="options.lineThickness" name="lineThickness" :min="1" :max="32" />
              </UFormField>

              <UFormField label="Height">
                <USlider v-model="options.pathHeightScale" name="height" :step="0.01" :min="0" :max="1" />
              </UFormField>

              <UFormField label="Width">
                <USlider v-model="options.pathWidthScale" name="width" :step="0.01" :min="0" :max="1" />
              </UFormField>

              <UFormField label="Horizontal Padding">
                <USlider
v-model="options.horizontalPadding" name="horizontalPadding" :step="2" :min="-options.width"
                  :max="options.width" />
              </UFormField>

              <UFormField label="Vertical Padding">
                <USlider
v-model="options.verticalPadding" name="verticalPadding" :step="2" :min="-options.height"
                  :max="options.height" />
              </UFormField>

              <UFormField label="Normalize">
                <USwitch v-model="options.normalize" name="normalize" />
              </UFormField>
              <UButton @click="onResetClicked">Reset</UButton>
            </UForm>
          </div>
          <div class="md:col-span-2">
            <!-- Image Type Selector -->
            <UFormField label="Image Type" class="mb-4">
              <UTabs v-model="variant" :content="false" :items="items" class="w-full" />
            </UFormField>

            <!-- Waveform UI Component Renderer -->
            <UTabs v-model="activeTab" class="md:col-span-2" :items="tabs">
              <template #designer>
                <div class="relative w-[100%] bg-[#1a1d1e]">
                  <WaveformImage
v-if="audioBuffer" class="absolute mb-4"
                    :style="{ left: '24.4%', top: '25%', width: '51.4%', zIndex: '10' }" :audio-buffer="audioBuffer"
                    :background-color="options.backgroundColor" :background-opacity="options.backgroundOpacity"
                    :vertical-padding="options.verticalPadding" :horizontal-padding="options.horizontalPadding"
                    :height="options.height" :variant="options.variant" :samples="samples" :size="options.size"
                    :normalize="options.normalize" :thickness="options.lineThickness"
                    :path-height-scale="options.pathHeightScale" :path-width-scale="options.pathWidthScale" />

                  <NuxtImg
height="1200" width="1024" :style="{ left: 0, top: 0, width: '100%', zIndex: '20' }"
                    :src="BlackHoodie" />
                </div>
              </template>

              <template #bespoke>
                <WaveformImage
v-if="audioBuffer" class="border-primary mb-4 border" :audio-buffer="audioBuffer"
                  :background-color="options.backgroundColor" :background-opacity="options.backgroundOpacity"
                  :vertical-padding="options.verticalPadding" :horizontal-padding="options.horizontalPadding"
                  :height="options.height" :variant="options.variant" :samples="samples" :size="options.size"
                  :normalize="options.normalize" :thickness="options.lineThickness"
                  :path-height-scale="options.pathHeightScale" :path-width-scale="options.pathWidthScale" />
              </template>

              <template #mod>
                <modified-linear-path
v-if="audioBuffer" class="mb-4" :audio-buffer="audioBuffer"
                  :background-color="options.backgroundColor" :background-opacity="options.backgroundOpacity"
                  :vertical-padding="options.verticalPadding" :horizontal-padding="options.horizontalPadding"
                  :height="options.height" :variant="options.variant" :samples="samples" :size="options.size"
                  :normalize="options.normalize" :thickness="options.lineThickness"
                  :path-height-scale="options.pathHeightScale" :path-width-scale="options.pathWidthScale"
                  :svg="{ stroke: 'url(#logograd)' }" />
              </template>

              <template #original>
                <original-linear-path
v-if="audioBuffer" class="mb-4" :animation="options.animation"
                  :animation-frames="options.frames" :audio-buffer="audioBuffer"
                  :background-color="options.backgroundColor" :background-opacity="options.backgroundOpacity"
                  :vertical-padding="options.verticalPadding" :horizontal-padding="options.horizontalPadding"
                  :height="options.height" :variant="options.variant" :samples="samples" :size="options.size"
                  :normalize="options.normalize" :thickness="options.lineThickness"
                  :path-height-scale="options.pathHeightScale" :path-width-scale="options.pathWidthScale"
                  :svg="{ stroke: 'url(#logograd)' }" />
              </template>
            </UTabs>
          </div>
          <div>
            <dl>
              <dt>Options</dt>
              <dd>
                <pre>
        <code>
          {{ options }}
        </code>
      </pre>
              </dd>
            </dl>
          </div>
        </div>
      </UPageBody>
    </UContainer>
  </UPage>
</template>
