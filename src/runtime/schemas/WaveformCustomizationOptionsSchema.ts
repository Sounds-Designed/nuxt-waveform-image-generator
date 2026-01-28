import * as z from "zod"

import WaveformComponentComponentTypeSchema from "./WaveformComponentComponentTypeSchema";
import WaveformComponentPathTypeSchema from "./WaveformComponentPathTypeSchema";

import type { IWaveformCustomizationOptions } from "../types";

export const WaveformCustomizationOptionsSchema = z.object({
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
  pathWidthScale: z.number().positive().min(0).max(1),
  onOptionsUpdated: z.function().optional()
}) satisfies z.ZodType<IWaveformCustomizationOptions>;

export default WaveformCustomizationOptionsSchema;
