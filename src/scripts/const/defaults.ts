import { OscillatorShaper, AttackShaper, ReleaseShaper } from "#scripts/shapers";
import { Colour } from "#scripts/types";
import type { Octave, Scalar, Seconds } from "#scripts/types";
import type { ShaperChain } from "#scripts/synth";


export const GAIN: Scalar = 0.7;

export const OCTAVE: Octave = 4;


export const ATTACK_TIME:  Seconds = 1.0;
export const RELEASE_TIME: Seconds = 1.0;

export const OSCILLATORS = [
  new OscillatorShaper("OSCILLATOR 1"),
];

export const TRANSFORMS: ShaperChain[] = [
  {
    title: "ENVELOPE",
    colour: Colour.PURPLE,
    shapers: [
      new AttackShaper(ATTACK_TIME),
      new ReleaseShaper(RELEASE_TIME),
    ],
  },
];
