import * as z from "zod"
import type { IPolarWaveformComponentProps } from "../types";
import BaseWaveformComponentPropsSchema from "./BaseWaveformComponentPropsSchema";

export const PolarWaveformComponentPropsSchema = BaseWaveformComponentPropsSchema.extend({
  distance: z.number().optional(),
  length: z.number().optional(),
  startDegrees: z.number().optional(),
  endDegrees: z.number().optional(),
  invertDegrees: z.boolean().optional(),
  invertPath: z.boolean().optional(),
}) satisfies z.ZodType<IPolarWaveformComponentProps>;

export default PolarWaveformComponentPropsSchema;
