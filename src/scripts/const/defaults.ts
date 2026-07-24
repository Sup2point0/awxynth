import { SHAPER_CHAINS } from "./shaper-chains";
import { OscillatorShaper } from "#scripts/shapers";
import type { Octave, Scalar } from "#scripts/types";
import type { ShaperChain } from "#scripts/synth";


export const GAIN: Scalar = 0.7;

export const OCTAVE: Octave = 4;


export const OSCILLATORS = [
  new OscillatorShaper("OSCILLATOR 1"),
];

export const TRANSFORMS: ShaperChain[] = [
  SHAPER_CHAINS["Post-Transforms"]["Envelope"](),
];
