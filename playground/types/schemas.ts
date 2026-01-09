import * as z from 'zod'
import { WaveformComponentComponentTypeSchema, WaveformComponentPathTypeSchema, type WaveformComponentComponentType, type WaveformComponentPathType } from '../../src/runtime/types'

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
}

export const CustomizationOptionsSchema = z.object({
  animation: z.boolean(),
  backgroundColor: z.string().optional(),
  backgroundOpacity: z.number().optional(),
  channel: z.number(),
  downsampleFactor: z.number(),
  frames: z.number(),
  height: z.number(),
  width: z.number(),
  verticalPadding: z.number(),
  horizontalPadding: z.number(),
  normalize: z.boolean(),
  variant: WaveformComponentComponentTypeSchema,
  type: WaveformComponentPathTypeSchema,
  lineThickness: z.number().positive().max(32),
  size: z.number().positive().min(0).max(100),
  pathHeightScale: z.number().positive().min(0).max(1),
  pathWidthScale: z.number().positive().min(0).max(1)
}) satisfies z.ZodType<IWaveformCustomizationOptions>

export type CustomizationOptions = z.output<typeof CustomizationOptionsSchema>
