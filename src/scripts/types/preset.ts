import type { Latex, Arrayable } from "#scripts/types";


export interface ShaperPreset
{
  title: string;
  latex: Arrayable<Latex | Desmos.ExpressionState>;
}
