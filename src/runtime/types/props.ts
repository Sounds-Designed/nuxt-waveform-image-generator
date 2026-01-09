import type { WaveformComponentPathType, WaveformComponentFlipOptions } from "./app.config";

export interface SVGModifierProps {
  stroke?: string,
  strokeWidth?: number;
  fill?: string
}

export interface BasePathComponentProps {
  animation?: boolean;
  audioBuffer: AudioBuffer | null;
  channel?: number;
  frames?: number;
  normalize?: boolean;
  samples?: number;
  flip?: WaveformComponentFlipOptions,
  svg?: SVGModifierProps
  type?: WaveformComponentPathType;
}

export interface LinearWaveformComponentProps extends BasePathComponentProps {
  backgroundColor?: string;
  height?: number;
  width?: number;
  top?: number;
  left?: number;
}

export interface PolarWaveformComponentProps extends BasePathComponentProps {
    animationFrames: number;
    channel: number;
    distance: number;
    invertDegrees?: boolean;
    invertPath?: boolean;
    length: number;
    normalize: boolean;
    samples: number;
    startDegrees: number;
    endDegrees: number;
}

export interface SnakeWaveformComponentProps extends BasePathComponentProps {
    animationFrames: number;
    channel: number;
    distance: number;
    invertDegrees?: boolean;
    invertPath?: boolean;
    length: number;
    normalize: boolean;
    samples: number;
    startDegrees: number;
    endDegrees: number;
}
