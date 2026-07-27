import ltx from "#scripts/utils";
import { Colour } from "#scripts/types";
import type { ShaperChain } from "#scripts/types";

import {
  AttackShaper,
  ReleaseShaper,
  DistortionShaper,
  DetuneShaper,
} from "#scripts/shapers";


export const EnvelopeChain: ShaperChain = {
  title: "Envelope",
  colour: Colour.PURPLE,
  desmos: {
    latex: ltx `\operatorname{polygon}\left(\left(0,\ 0\right),\ \left(0.1,\ 1\right),\ \left(0.4,\ 0.25\right),\ \left(1,\ 0\right)\right)`,
  },
  desc: [
    // TODO
  ],
  create_instance: () => ({
    original: EnvelopeChain,
    disabled: true,
    shapers: [
      new AttackShaper(1.0),
      new ReleaseShaper(1.0),
    ],
  }),
}

export const DistortionChain: ShaperChain = {
  title: "Distortion / Symmetric",
  colour: Colour.RED,
  desmos: {
    latex: ltx `0 \leq y \leq \frac{\tanh\left(2x\right)}{\tanh\left(2\right)}`,
  },
  desc: [
    `Reshapes your waveform by applying a nonlinearity.`,
  ],
  create_instance: () => ({
    original: DistortionChain,
    disabled: false,
    shapers: [
      new DistortionShaper(),
    ],
  }),
};

export const DetuneChain: ShaperChain = {
  limit_single: true,
  title: "Detune",
  colour: Colour.PINK,
  desmos: {
    latex: ltx `x = [0, -0.1, 0.1, -0.3, 0.3, -0.6, 0.6, -1.0, 1.0]`,
  },
  desc: [
    `Stacks copies of your waveform with offset pitch to create a fuller sound.`,
  ],
  create_instance: () => ({
    original: DetuneChain,
    disabled: false,
    shapers: [
      new DetuneShaper(),
    ]
  }),
};


export const SHAPER_CHAINS: Record<string, ShaperChain[]> =
{
  "Post-Transforms": [
    EnvelopeChain,
    DistortionChain,
  ],
  "One-Off": [
    DetuneChain,
  ],
};
