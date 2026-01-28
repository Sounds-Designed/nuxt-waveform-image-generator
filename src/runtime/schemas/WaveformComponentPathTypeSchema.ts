import * as z from "zod"
import { WaveformPathType } from "../constants";

export const WaveformComponentPathTypeSchema = z.enum(WaveformPathType);

export default WaveformComponentPathTypeSchema;
