import { ltx } from "#scripts/utils";

import { presets } from "./shared";


export const distortions = presets(
{
  builtins: [
    {
      title: "Linear",
      latex: ltx `f \left( t \right) = 1.5t`,
    },
  ],
});
