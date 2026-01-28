import * as z from "zod"
import { WaveformFlipOptions } from "../constants";

export const WaveformComponentFlipOptionsSchema = z.enum(WaveformFlipOptions);

export default WaveformComponentFlipOptionsSchema;
