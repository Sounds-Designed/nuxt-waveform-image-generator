import * as z from 'zod'
import { PathComponentTypeSchema } from '../../src/runtime/types'

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
  variant: z.enum(["linear", "polar", "snake"]),
  type: z.union([z.string(), PathComponentTypeSchema]),
  lineThickness: z.number().positive().max(32),
  size: z.number().positive().min(0).max(100),
  pathHeightScale: z.number().positive().min(0).max(1),
  pathWidthScale: z.number().positive().min(0).max(1)
})

export type CustomizationOptions = z.output<typeof CustomizationOptionsSchema>

export type GradientFillAttributes = {
  offset: number;
  style: string;
}
