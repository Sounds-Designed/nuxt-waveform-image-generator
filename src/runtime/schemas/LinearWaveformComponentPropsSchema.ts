import * as z from "zod"
import type { ILinearWaveformComponentProps } from "../types";
import BaseWaveformComponentPropsSchema from "./BaseWaveformComponentPropsSchema";

export const LinearWaveformComponentPropsSchema = BaseWaveformComponentPropsSchema.extend({

}) satisfies z.ZodType<ILinearWaveformComponentProps>;

export default LinearWaveformComponentPropsSchema;
