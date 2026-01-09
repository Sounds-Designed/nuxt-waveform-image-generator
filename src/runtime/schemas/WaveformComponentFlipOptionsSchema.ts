import * as z from "zod"

export const WaveformComponentFlipOptionsSchema = z.enum(["both", "horizontal", "none", "vertical"]);

export default WaveformComponentFlipOptionsSchema;
