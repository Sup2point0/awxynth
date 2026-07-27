import { OscillatorShaper } from "#scripts/shapers";
import { EnvelopeChain } from "#scripts/const/shaper-chains";
import type { Octave, Scalar, ShaperChainInstance } from "#scripts/types";


export const GAIN: Scalar = 0.7;

export const OCTAVE: Octave = 4;


export const OSCILLATORS = [
  new OscillatorShaper("OSCILLATOR 1"),
];

export const TRANSFORMS: ShaperChainInstance[] = [
  EnvelopeChain.create_instance(),
];

/* NOTE: Start with instant attack and release, but have envelope shown ready to be enabled - also teaches user immediately how to enable/disable shapers! */
TRANSFORMS[0].disabled = true;
