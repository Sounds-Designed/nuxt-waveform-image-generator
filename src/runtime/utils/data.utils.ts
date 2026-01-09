import type { ProcessSampleVolumeOptions } from "../types/app.config";

export const getFramesData = (audioBuffer: AudioBuffer, channel: number, animation: boolean, animationframes: number) => {
  const rawData = audioBuffer.getChannelData(channel);
  const framesData = [];

  if (animation) {
    const frames = audioBuffer.sampleRate / animationframes;
    for (let index = 0; index < rawData.length; index += frames) {
      const partraw = rawData.slice(index, index + frames);
      framesData.push(partraw);
    }
  } else {
    framesData.push(rawData);
  }

  return framesData;
};

export const getFilterData = (frames: Array<Float32Array>, samples: number): number[][] => {
  // If no frames are provided return an empty array earlier
  if (!frames.length) return [];

  // Setup an array to store our downsampled frames
  const outputFrames: number[][] = [];
  const { length } = frames;

  for (let frameIndex = 0; frameIndex < length; frameIndex++) {
    if (frameIndex >= length) break;

    const frame: Float32Array | undefined = frames[frameIndex];

    if (!frame) continue;

    const blockSize: number = Math.floor(frame.length / samples); // the number of samples in each subdivision
    const filteredDataBlock: number[] = [];

    for (let i = 0; i < samples; i++) {
      if (i >= samples) break;

      const blockStart: number = blockSize * i; // the location of the first sample in the block
      let sum: number = 0;

      for (let j = 0; j < blockSize; j++) {
        if (j >= blockSize) break;

        const sample: number | undefined = frame[blockStart + j];

        if (sample === undefined) continue;

        sum = sum + Math.abs(sample); // find the sum of all the samples in the block
      }

      filteredDataBlock.push(sum / blockSize); // divide the sum by the block size to get the average
    }

    outputFrames.push(filteredDataBlock);
  }

  return outputFrames;
};

export const processSampleVolume = (frames: number[][], options: ProcessSampleVolumeOptions): number[][] => {
  if (!frames.length) return [];

  let normalizationFactor = 1;

  if (options.normalize) {
    const multipliers: number[] = [];

    frames.forEach((frame: number[]) => {
      const multiplier: number = Math.max(...frame);

      multipliers.push(multiplier);
    });

    normalizationFactor = Math.pow(Math.max(...multipliers), -1);
  }

  const processed: number[][] = frames.map((frame: number[]) => {
    return frame.map((sample: number) => sample * normalizationFactor);
    // return frame.map((sample: number) => sample * (normalizationFactor * options.scale));
  });

  return processed;
};
