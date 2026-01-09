import * as z from "zod"
import type { IBasePathComponentProps } from "../types";
import WaveformComponentPathTypeSchema from "./WaveformComponentPathTypeSchema";
import SVGModifierPropsSchema from "./SVGModifierPropsSchema";
import WaveformComponentFlipOptionsSchema from "./WaveformComponentFlipOptionsSchema";

export const BaseWaveformComponentPropsSchema = z.object({
  backgroundColor: z.string(),
  backgroundOpacity: z.number(),
  animation: z.boolean(),
  audioBuffer: z.unknown(),
  channel: z.number().positive().optional(),
  animationFrames: z.number().positive().optional(),
  normalize: z.boolean(),
  samples: z.number().positive().optional(),
  flip: WaveformComponentFlipOptionsSchema,
  svg: SVGModifierPropsSchema,
  type: WaveformComponentPathTypeSchema,
  height: z.number().positive().optional(),
  width: z.number().positive().optional(),
}) satisfies z.ZodType<IBasePathComponentProps>;

export default BaseWaveformComponentPropsSchema;
