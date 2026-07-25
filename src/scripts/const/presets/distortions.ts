import ltx from "#scripts/utils";

import { presets } from "./shared";


export const distortions = presets(
{
  builtins: [
    {
      title: "Linear",
      latex: [
        ltx `f \left( t \right) = kt`,
        // @ts-ignore outdated types
        { latex: ltx `k = 1.5`, sliderBounds: { min: "1", max: "10" } },
      ],
    },
  ],
});
