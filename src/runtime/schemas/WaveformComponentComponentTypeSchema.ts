import * as z from "zod"

export const WaveformComponentComponentTypeSchema = z.enum(["linear", "polar", "snake"]);

export default WaveformComponentComponentTypeSchema;
