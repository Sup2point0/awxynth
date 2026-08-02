import type { int, Amplitude } from "#scripts/types";


/**
 * Clamp amplitudes in `data` to `[-1.0, 1.0]`.
 * 
 * `NaN` values are set to `0`.
 */
export function clip(data: Amplitude[]): Amplitude[]
{
  return data.map(x => isNaN(x) ? 0 : Math.min(1.0, Math.max(-1.0, x)));
}


/**
 * Lower the resolution of `data` by interpolating chunks of size `rate`.
 * 
 * For instance, `downsample(_, 2)` halves the number of points by averaging each pair of adjacent points.
 */
export function downsample(data: ArrayLike<number>, rate: int): number[]
{
  let out = [];
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    sum += data[i];

    if ((i + 1) % rate === 0) {
      out.push(sum / rate);
      sum = 0;
    }
  }

  return out;
}
