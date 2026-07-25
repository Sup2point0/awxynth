import type { int } from "#scripts/types";


/**
 * Iterate over `data` with a sliding window of `window_size`.
 * 
 * Starts left-aligned to the first element and finishes right-aligned to the last element.
 * 
 * `window_size` must be positive.
 */
export function* iter_windowed<T>(data: ArrayLike<T>, window_size?: int): Generator<T[]>
{
  window_size ??= 1;

  let total = data.length + 1;

  for (let i = 0; i < total - window_size; i++) {
    let out = [];

    for (let j = 0; j < window_size; j++) {
      out.push(data[i + j]);
    }

    yield out;
  }
}
