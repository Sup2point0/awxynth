import ltx from "#scripts/utils";

import { define_presets } from "./shared";


export const detunes = define_presets(
{
  builtins: [
    {
      title: "Wide",
      latex: [
        ltx `\phi_{voices} = 8`,
      ],
    }
  ],
});
