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

export interface LinearPathComponentProps extends BasePathComponentProps {
  backgroundColor?: string;
  height?: number;
  width?: number;
  top?: number;
  left?: number;
}

export interface PolarPathComponentProps extends BasePathComponentProps {
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
