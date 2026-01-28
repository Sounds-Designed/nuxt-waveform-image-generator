import { getAudioBufferFromURL } from '@sounds-designed/audio-to-image-utils';
import { onMounted, onUnmounted, ref, type Ref } from 'vue';

export function useAudioBuffer(fileUrl: string): {
    audioBuffer: Ref<AudioBuffer | null>,
    clearFile: (fileUrl: string) => void,
    mountFile: (fileUrl: string) => Promise<Ref<AudioBuffer | null>> } {

  let audioBuffer: Ref<AudioBuffer | null> = ref(null);

  const clearFile = () => {
    audioBuffer.value = null;
  }

  const mountFile = async (fileUrl: string) => {
    return new Promise<Ref<AudioBuffer | null>>(async (resolve, reject) => {
      try {
        audioBuffer.value = await getAudioBufferFromURL(fileUrl);

        resolve(audioBuffer)
      } catch(error) {
        reject(error)
      }
    })
  }

  onMounted(() => {
    mountFile(fileUrl);
  })

  onUnmounted(() => {
    clearFile();
  })

  return { audioBuffer, clearFile, mountFile }
}
