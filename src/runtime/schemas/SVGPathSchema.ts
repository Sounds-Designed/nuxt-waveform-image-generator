import * as z from "zod"
import type { ISVGPath } from "../types";

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
}) satisfies z.ZodType<ISVGPath>

export default SVGPathSchema;
