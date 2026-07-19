import type { Amplitude } from "#scripts/types";


/**
 * Clamp amplitudes in `data` to `[-1.0, 1.0]`.
 */
export function clip(data: Amplitude[]): Amplitude[]
{
  return data.map(x => Math.min(1.0, Math.max(-1.0, x)));
}
