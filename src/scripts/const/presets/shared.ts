import type { ShaperPreset } from "#scripts/types";

/**
 * Infer key literals on `data`.
 * 
 * Neat hack for keeping `ShaperPreset[]` as value type but letting TypeScript infer key literals!
 */
export function define_presets<T extends Record<string, ShaperPreset[]>>(
  data: T
)
{
  return data;
}
