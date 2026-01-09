declare module '#build/app.config' {
  import type { AppConfig } from '@nuxt/schema'

  const _default: AppConfig
  export default _default
}

import * as z from 'zod'

export const WaveformComponentComponentTypeSchema = z.enum(["linear", "polar", "snake"]);
export const WaveformComponentPathTypeSchema = z.enum(["bars", "steps", "mirror"]);
export const WaveformComponentFlipOptionsSchema = z.enum(["both", "horizontal", "none", "vertical"])

export interface ISVGPath {
  d: string;
  r?: string;
  sr?: string;
  er?: string;
  deg?: number;
  sdeg?: number;
  edeg?: number;
  minshow?: number;
  maxshow?: number;
  normalize?: boolean;
}

export const SVGPathSchema = z.object({
  d: z.string(),
  r: z.number().positive().optional(),
  sr: z.number().positive().optional(),
  er: z.number().positive().optional(),
  deg: z.number().positive().optional(),
  sdeg: z.number().positive().optional(),
  edeg: z.number().positive().optional(),
  minshow: z.number().positive().max(1).optional(),
  maxshow: z.number().positive().max(1).optional(),
  normalize: z.boolean().optional()
}) satisfies z.ZodType<SVGPathSchema>

export interface IBaseWaveformProps {
  audioBuffer: AudioBuffer,
  type: WaveformComponentPathType,
  channel: number;
  samples: number;
  normalize: boolean;
  svgPaths: SVGPath[],
  animation: boolean;
  animationFrames: number;
  top: number;
  left: number;
}

export interface ILinearWaveformProps extends IBaseWaveformProps {
  distance: number;
  startDegrees: number;
  endDegrees: number;
  invertDegrees: boolean;
  invertPath: boolean;
}

export interface IPolarWaveformProps extends IBaseWaveformProps {
  distance: number;
  startDegrees: number;
  endDegrees: number;
  invertDegrees: boolean;
  invertPath: boolean;
}

export interface ISnakeWaveformProps extends IBaseWaveformProps {
  distance: number;
  startDegrees: number;
  endDegrees: number;
  invertDegrees: boolean;
  invertPath: boolean;
}

export const LinearWaveformPropsSchema = z.object({
  audioBuffer: z.unknown(),
  type: z.union([z.string(), WaveformComponentPathTypeSchema]),
  channel: z.number(),
  samples: z.number(),
  normalize: z.boolean(),
  svgPaths: z.array(SVGPathSchema),
  top: z.number(),
  left: z.number(),
  distance: z.number(),
  startDegrees: z.number(),
  endDegrees: z.number(),
  invertDegrees: z.boolean(),
  invertPath: z.boolean(),
  animation: z.boolean(),
  animationFrames: z.number(),
}) satisfies z.ZodType<ILinearWaveformProps>

export const PolarWaveformPropsSchema = z.object({
  audioBuffer: z.unknown(),
  type: z.union([z.string(), WaveformComponentPathTypeSchema]),
  channel: z.number(),
  samples: z.number(),
  normalize: z.boolean(),
  svgPaths: z.array(SVGPathSchema),
  top: z.number(),
  left: z.number(),
  distance: z.number(),
  length: z.number(),
  startDegrees: z.number(),
  endDegrees: z.number(),
  invertDegrees: z.boolean(),
  invertPath: z.boolean(),
  animation: z.boolean(),
  animationFrames: z.number(),
}) satisfies z.ZodType<IPolarWaveformProps>

export const SnakeWaveformPropsSchema = z.object({
  audioBuffer: z.unknown(),
  type: z.union([z.string(), WaveformComponentPathTypeSchema]),
  channel: z.number(),
  samples: z.number(),
  normalize: z.boolean(),
  svgPaths: z.array(SVGPathSchema),
  top: z.number(),
  left: z.number(),
  distance: z.number(),
  length: z.number(),
  startDegrees: z.number(),
  endDegrees: z.number(),
  invertDegrees: z.boolean(),
  invertPath: z.boolean(),
  animation: z.boolean(),
  animationFrames: z.number(),
}) satisfies z.ZodType<ISnakeWaveformProps>

export interface ProcessSampleVolumeOptions {
  normalize: boolean;
  scale: number;
}

export interface GradientFillAttributes {
  offset: number;
  style: string;
}

export type WaveformComponentComponentType = z.output<typeof WaveformComponentComponentTypeSchema>
export type WaveformComponentFlipOptions = z.output<typeof WaveformComponentFlipOptionsSchema>
export type WaveformComponentPathType = z.output<typeof WaveformComponentPathTypeSchema>

export type LinearWaveformProps = z.output<typeof LinearWaveformPropsSchema>
export type PolarWaveformProps = z.output<typeof PolarWaveformPropsSchema>
export type SnakeWaveformProps = z.output<typeof SnakeWaveformPropsSchema>

export type SVGPath = z.output<typeof SVGPathSchema>
