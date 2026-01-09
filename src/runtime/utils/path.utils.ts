import type { PolarWaveformProps } from "../types/app.config";
import { getFilterData, getFramesData, processSampleVolume } from "./data.utils";

const getSnakePathOptions = (options?: Partial<Omit<PolarWaveformProps, "audioBuffer">>): Omit<PolarWaveformProps, "audioBuffer"> => {
  const defaultSvgPaths = [{ d: "Q", sdeg: 0, sr: 0, deg: 50, r: 100, edeg: 100, er: 0 }];

  const defaults: Omit<PolarWaveformProps, "audioBuffer"> = {
    channel: 0,
    samples: 1,
    distance: 50,
    length: 60,
    top: 0,
    left: 0,
    type: "steps",
    startDegrees: 0,
    endDegrees: 360,
    invertDegrees: false,
    invertPath: false,
    svgPaths: [],
    animation: false,
    animationFrames: 10,
    normalize: true,
  };

  const _options =  Object.assign({}, defaults, options || {}) as Omit<PolarWaveformProps, "audioBuffer">;

  if(!_options.svgPaths.length) _options.svgPaths = defaultSvgPaths;

  return _options;
};

export const snakePath = (audioBuffer: AudioBuffer, options: Partial<PolarWaveformProps>) => {
  const {
    channel,
    samples = audioBuffer.length,
    distance,
    length,
    top,
    left,
    type,
    startDegrees,
    endDegrees,
    invertDegrees,
    invertPath,
    svgPaths = [{ d: "Q", sdeg: 0, sr: 0, deg: 50, r: 100, edeg: 100, er: 0 }],
    animation = false,
    animationFrames = 10,
    normalize = true,
  } = getSnakePathOptions(options);

  const framesData = getFramesData(audioBuffer, channel, animation, animationFrames);
  const filteredData = getFilterData(framesData, samples);
  const normalizeData = normalize ? processSampleVolume(filteredData, { normalize }) : filteredData;

  let path = ``;
  const fixenddeg = endDegrees < startDegrees ? endDegrees + 360 : endDegrees;
  const deg = !invertDegrees ? (fixenddeg - startDegrees) / samples : (startDegrees - fixenddeg) / samples;
  const fixOrientation = !invertDegrees ? 90 + startDegrees : 90 + startDegrees + 180;
  const invert = !invertPath ? 1 : -1;
  const pathslength = svgPaths.length;
  const fixpathslength = type == "mirror" ? pathslength * 2 : pathslength;
  const pi180 = Math.PI / 180;

  const normalizeDataLength = normalizeData.length;

  // For each data frame
  for (let frameIndex = 0; frameIndex < normalizeDataLength; frameIndex++) {
    // `f` = frame index
    if (frameIndex > 0) {
      const pathlength = path.length;
      const lastvalue = path.charAt(pathlength - 1);
      if (lastvalue == ";" || pathlength === 0) {
        path += " M 0 0 ;";
      } else {
        path += ";";
      }
    }

    let last_pos_x = -9999;
    let last_pos_y = -9999;

    for (let sampleIndex = 0; sampleIndex < samples; sampleIndex++) {
      const positive = type != "bars" ? (sampleIndex % 2 ? 1 : -1) : 1;
      let mirror = 1;
      for (let pathIndex = 0; pathIndex < fixpathslength; pathIndex++) {
        let k = pathIndex;
        if (pathIndex >= pathslength) {
          k = pathIndex - pathslength;
          mirror = -1;
        }
        const svgPath = svgPaths[k];

        if (!svgPath) continue;

        svgPath.minshow = svgPath.minshow ?? 0;
        svgPath.maxshow = svgPath.maxshow ?? 1;
        svgPath.normalize = svgPath.normalize ?? false;
        const normalizeDataValue = svgPath.normalize ? 1 : normalizeData[frameIndex][sampleIndex];
        if (svgPath.minshow <= normalizeData[frameIndex][sampleIndex] && svgPath.maxshow >= normalizeData[frameIndex][sampleIndex]) {
          switch (svgPath.d) {
            // LineTo Commands
            case "L": {
              //
              const angleStart = (deg * (sampleIndex + svgPath.sdeg / 100) - fixOrientation) * pi180;
              const angleEnd = (deg * (sampleIndex + svgPath.edeg / 100) - fixOrientation) * pi180;

              const pos_x =
                left +
                (length * (svgPath.sr / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.cos(angleStart);
              const pos_y =
                top +
                (length * (svgPath.sr / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.sin(angleStart);

              const end_pos_x =
                left +
                (length * (svgPath.er / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.cos(angleEnd);
              const end_pos_y =
                top +
                (length * (svgPath.er / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.sin(angleEnd);

              if (pos_x !== last_pos_x || pos_y !== last_pos_y) {
                path += `M ${pos_x} ${pos_y} `;
              }

              path += `L ${end_pos_x} ${end_pos_y} `;

              last_pos_x = end_pos_x;
              last_pos_y = end_pos_y;
              break;
            }

            // Cubic Bézier Curve Commands
            case "C": {
              const angleStart = (deg * (sampleIndex + svgPath.sdeg / 100) - fixOrientation) * pi180;
              const angle = (deg * (sampleIndex + svgPath.deg / 100) - fixOrientation) * pi180;
              const angleEnd = (deg * (sampleIndex + svgPath.edeg / 100) - fixOrientation) * pi180;

              const pos_x =
                left +
                (length * (svgPath.sr / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.cos(angleStart);
              const pos_y =
                top +
                (length * (svgPath.sr / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.sin(angleStart);

              const center_pos_x =
                left +
                (length * (svgPath.r / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.cos(angle);
              const center_pos_y =
                top +
                (length * (svgPath.r / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.sin(angle);

              const end_pos_x =
                left +
                (length * (svgPath.er / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.cos(angleEnd);
              const end_pos_y =
                top +
                (length * (svgPath.er / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.sin(angleEnd);

              if (pos_x !== last_pos_x || pos_y !== last_pos_y) {
                path += `M ${pos_x} ${pos_y} `;
              }

              path += `C ${pos_x} ${pos_y} ${center_pos_x} ${center_pos_y} ${end_pos_x} ${end_pos_y} `;

              last_pos_x = end_pos_x;
              last_pos_y = end_pos_y;
              break;
            }

            // Quadratic Bézier Curve Commands
            case "Q": {
              const angleStart = (deg * (sampleIndex + svgPath.sdeg / 100) - fixOrientation) * pi180;
              const angle = (deg * (sampleIndex + svgPath.deg / 100) - fixOrientation) * pi180;
              const angleEnd = (deg * (sampleIndex + svgPath.edeg / 100) - fixOrientation) * pi180;

              const pos_x =
                left +
                (length * (svgPath.sr / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.cos(angleStart);
              const pos_y =
                top +
                (length * (svgPath.sr / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.sin(angleStart);

              const center_pos_x =
                left +
                (length * (svgPath.r / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.cos(angle);
              const center_pos_y =
                top +
                (length * (svgPath.r / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.sin(angle);

              const end_pos_x =
                left +
                (length * (svgPath.er / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.cos(angleEnd);
              const end_pos_y =
                top +
                (length * (svgPath.er / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.sin(angleEnd);

              if (pos_x !== last_pos_x || pos_y !== last_pos_y) {
                path += `M ${pos_x} ${pos_y} `;
              }

              path += `Q ${center_pos_x} ${center_pos_y} ${end_pos_x} ${end_pos_y} `;

              last_pos_x = end_pos_x;
              last_pos_y = end_pos_y;
              break;
            }

            // Elliptical Arc Curve Commands
            case "A": {
              const angleStart = (deg * (sampleIndex + svgPath.sdeg / 100) - fixOrientation) * pi180;
              const angleEnd = (deg * (sampleIndex + svgPath.edeg / 100) - fixOrientation) * pi180;

              const pos_x =
                left +
                (length * (svgPath.sr / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.cos(angleStart);
              const pos_y =
                top +
                (length * (svgPath.sr / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.sin(angleStart);

              const end_pos_x =
                left +
                (length * (svgPath.er / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.cos(angleEnd);
              const end_pos_y =
                top +
                (length * (svgPath.er / 100) * normalizeDataValue * positive * mirror * invert + distance) *
                Math.sin(angleEnd);

              if (pos_x !== last_pos_x || pos_y !== last_pos_y) {
                path += `M ${pos_x} ${pos_y} `;
              }

              const angle = (deg * sampleIndex * svgPath.angle) / 100;
              const rx = (svgPath.rx * deg) / 100;
              const ry = (svgPath.ry * deg) / 100;

              let sweep = svgPath.sweep;
              if (positive == -1) {
                if (sweep == 1) {
                  sweep = 0;
                } else {
                  sweep = 1;
                }
              }
              if (mirror == -1) {
                if (sweep == 1) {
                  sweep = 0;
                } else {
                  sweep = 1;
                }
              }
              path += `A ${rx} ${ry} ${angle} ${svgPath.arc} ${sweep} ${end_pos_x} ${end_pos_y} `;

              last_pos_x = end_pos_x;
              last_pos_y = end_pos_y;
              break;
            }

            // ClosePath Commands
            case "Z":
              path += "Z ";
              break;

            default:
              break;
          }
        }
      }
    }
  }
  return path;
};
