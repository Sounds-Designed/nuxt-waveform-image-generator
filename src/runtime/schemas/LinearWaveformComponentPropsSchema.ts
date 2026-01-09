import * as z from "zod"
import type { ILinearWaveformComponentProps } from "../types";
import BaseWaveformComponentPropsSchema from "./BaseWaveformComponentPropsSchema";

export const LinearWaveformComponentPropsSchema = BaseWaveformComponentPropsSchema.extend({
  height: z.number().positive(),
  width: z.number().positive(),
}) satisfies z.ZodType<ILinearWaveformComponentProps>;

export default LinearWaveformComponentPropsSchema;
