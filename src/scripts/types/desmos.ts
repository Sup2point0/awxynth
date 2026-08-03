import type { Latex } from "#scripts/types";


export interface GraphBounds
{
  x: [lower: number | Latex, upper: number | Latex];
  y: [lower: number | Latex, upper: number | Latex];
  
  x_pi?: boolean;
  y_pi?: boolean;
}
