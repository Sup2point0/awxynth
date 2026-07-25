import type { Latex } from "#scripts/types";


export interface ShaperPreset
{
  title: string;
  latex: Latex | Latex[] | Desmos.ExpressionState[];
}
