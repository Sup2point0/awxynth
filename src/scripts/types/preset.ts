import type { Latex, MaybeArray } from "#scripts/types";


export interface ShaperPreset
{
  title: string;
  latex: MaybeArray<Latex | Desmos.ExpressionState>;
}
