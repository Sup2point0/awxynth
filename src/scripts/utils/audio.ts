import type { int, Amplitude } from "#scripts/types";


function bad(x: number): boolean
{
  return x == undefined || Number.isNaN(x);
}


function clamp(min: number, x: number, max: number)
{
  return Math.min(max, Math.max(min, x));
}


/**
 * Sanitise `data` by setting `NaN` and `undefined` values to `0`.
 */
export function sanitise(data: Amplitude[]): Amplitude[]
{
  return data.map(x => bad(x) ? 0 : x);
}


/**
 * Sanitise and clamp amplitudes in `data` to `[-1.0, 1.0]`.
 */
export function clip(data: Amplitude[]): Amplitude[]
{
  return data.map(x => bad(x) ? 0 : clamp(-1.0, x, 1.0));
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
