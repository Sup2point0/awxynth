import { Colour } from "#scripts/types";
import type { ShaperChain } from "#scripts/synth";

import {
  AttackShaper,
  ReleaseShaper,
  DistortionShaper,
} from "#scripts/shapers";


export const SHAPER_CHAINS: Record<string, Record<string, () => ShaperChain>> =
{
  "Post-Transforms":
  {
    "Envelope": () => ({
      title: "Envelope",
      colour: Colour.PURPLE,
      disabled: false,
      shapers: [
        new AttackShaper(1.0),
        new ReleaseShaper(1.0),
      ],
    }),
    "Distortion": () => ({
      title: "Distortion",
      colour: Colour.RED,
      disabled: false,
      shapers: [
        new DistortionShaper()
      ],
    }),
  },
};
