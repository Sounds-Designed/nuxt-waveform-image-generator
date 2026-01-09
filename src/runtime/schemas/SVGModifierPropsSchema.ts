import * as z from "zod"
import type { ISVGModifierProps } from "../types";
import SVGPathSchema from "./SVGPathSchema";

export const SVGModifierPropsSchema = z.object({
  stroke: z.string().optional(),
  strokeWidth: z.number().positive().optional(),
  fill: z.string().optional(),
  paths: z.array(SVGPathSchema).optional(),
}) satisfies z.ZodType<ISVGModifierProps>

export default SVGModifierPropsSchema;
