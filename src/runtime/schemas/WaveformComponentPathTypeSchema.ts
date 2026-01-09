import * as z from "zod"

export const WaveformComponentPathTypeSchema = z.enum(["bars", "steps", "mirror"]);

export default WaveformComponentPathTypeSchema;
