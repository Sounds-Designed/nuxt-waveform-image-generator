import * as z from "zod"
import type { ISnakeWaveformComponentProps } from "../types";
import PolarWaveformComponentPropsSchema from "./PolarWaveformComponentPropsSchema";

export const SnakeWaveformComponentPropsSchema = PolarWaveformComponentPropsSchema.extend({

}) satisfies z.ZodType<ISnakeWaveformComponentProps>;

export default SnakeWaveformComponentPropsSchema;
