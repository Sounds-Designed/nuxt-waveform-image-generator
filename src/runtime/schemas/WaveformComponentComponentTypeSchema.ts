import * as z from "zod"
import { WaveformComponent } from "../constants";

export const WaveformComponentComponentTypeSchema = z.enum(WaveformComponent);

export default WaveformComponentComponentTypeSchema;
