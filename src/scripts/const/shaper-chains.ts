import ltx from "#scripts/utils";
import { Colour } from "#scripts/types";
import type { ShaperChain, ShaperChainInstance } from "#scripts/types";

import {
  AttackShaper,
  ReleaseShaper,
  DistortionShaper,
} from "#scripts/shapers";


export const EnvelopeChain: ShaperChain = {
  title:  "Envelope",
  colour: Colour.PURPLE,
  desmos: {
    latex: ltx `\operatorname{polygon}\left(\left(0,\ 0\right),\ \left(0.1,\ 1\right),\ \left(0.4,\ 0.25\right),\ \left(1,\ 0\right)\right)`,
  },
  desc: [
    // TODO
  ],
  create_instance: () => ({
    disabled: true,
    shapers: [
      new AttackShaper(1.0),
      new ReleaseShaper(1.0),
    ],
  }),
}

export const DistortionChain: ShaperChain = {
  title: "Distortion (Symmetric)",
  colour: Colour.RED,
  desmos: {
    latex: ltx `\frac{\tanh\left(2x\right)}{\tanh\left(2\right)}`,
  },
  desc: [
    `Reshapes your waveform by applying a nonlinearity.`,
  ],
  create_instance: () => ({
    disabled: false,
    shapers: [
      new DistortionShaper(),
    ],
  }),
};


export const SHAPER_CHAINS: Record<string, ShaperChain[]> =
{
  "Post-Transforms": [
    EnvelopeChain,
    DistortionChain,
  ],
};
