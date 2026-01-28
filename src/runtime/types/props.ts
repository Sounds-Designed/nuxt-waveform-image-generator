import type * as z from "zod";
import type { BaseWaveformComponentPropsSchema, LinearWaveformComponentPropsSchema, PolarWaveformComponentPropsSchema, SnakeWaveformComponentPropsSchema, SVGModifierPropsSchema, SVGPathSchema, WaveformComponentComponentTypeSchema, WaveformComponentFlipOptionsSchema, WaveformComponentPathTypeSchema, WaveformCustomizationOptionsSchema, WaveformImageWrapperComponentPropsSchema } from "../schemas";

/**
 * Interfaces
 */
export interface ISVGModifierProps {
  stroke?: string,
  strokeWidth?: number;
  fill?: string;
  paths?: ISVGPath[]
}

export interface ISVGPath {
  d: string;
  r?: number;
  sr?: number;
  er?: number;
  deg?: number;
  sdeg?: number;
  edeg?: number;
  minshow?: number;
  maxshow?: number;
  normalize?: boolean;
}

export interface ProcessSampleVolumeOptions {
  normalize: boolean;
  scale: number;
}

export interface GradientFillAttributes {
  offset: number;
  style: string;
}

export interface IBasePathComponentProps {
  /**
   * One requirement, the audio buffer to display as a waveform image
   */
  audioBuffer: AudioBuffer;
  type?: WaveformComponentPathType;
  /**
   * Audio Processing Options
   */
  channel?: number;
  normalize?: boolean;
  samples?: number;
  /**
   * Styling
   */
  backgroundColor?: string;
  backgroundOpacity?: number;
  flip?: WaveformComponentFlipOptions;
  svg?: ISVGModifierProps;
  /**
   * Dimensions & offsets
   */
  height?: number;
  width?: number;
  top?: number;
  left?: number;
  /**
   * Animation Options
   */
  animation?: boolean;
  animationFrames?: number;
}

export interface ILinearWaveformComponentProps extends IBasePathComponentProps {
  backgroundColor?: string;
  height?: number;
  width?: number;
  top?: number;
  left?: number;
  pathHeightScale?: number;
  pathWidthScale?: number;
}

export interface IPolarWaveformComponentProps extends IBasePathComponentProps {
  distance?: number;
  invertDegrees?: boolean;
  invertPath?: boolean;
  length?: number;
  startDegrees?: number;
  endDegrees?: number;
}

export interface ISnakeWaveformComponentProps extends IPolarWaveformComponentProps {
  distance?: number;
}

export interface IWaveformCustomizationOptions {
  animation: boolean;
  backgroundColor?: string;
  backgroundOpacity?: number;
  channel: number;
  downsampleFactor: number;
  frames: number;
  height: number;
  width: number;
  verticalPadding: number;
  horizontalPadding: number;
  normalize: boolean;
  variant: WaveformComponentComponentType,
  type: WaveformComponentPathType,
  lineThickness: number;
  size: number;
  pathHeightScale: number;
  pathWidthScale: number;
  onOptionsUpdated?: Function
}

/**
 * Types
 */
export type WaveformComponentComponentType = z.output<typeof WaveformComponentComponentTypeSchema>
export type WaveformComponentFlipOptions = z.output<typeof WaveformComponentFlipOptionsSchema>
export type WaveformComponentPathType = z.output<typeof WaveformComponentPathTypeSchema>

export type WaveformImageWrapperComponentProps = z.output<typeof WaveformImageWrapperComponentPropsSchema>

export type BaseWaveformProps = z.output<typeof BaseWaveformComponentPropsSchema>
export type LinearWaveformProps = z.output<typeof LinearWaveformComponentPropsSchema>
export type PolarWaveformProps = z.output<typeof PolarWaveformComponentPropsSchema>
export type SnakeWaveformProps = z.output<typeof SnakeWaveformComponentPropsSchema>

export type SVGModifierProps = z.output<typeof SVGModifierPropsSchema>
export type SVGPath = z.output<typeof SVGPathSchema>

export type WaveformCustomizationOptions = z.output<typeof WaveformCustomizationOptionsSchema>
