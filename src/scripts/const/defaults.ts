/**
 * Defaults for a synth.
 */
export const DEFAULTS =
{
  GAIN: 0.7,
  
  OCTAVE: 4,
  
  OSC: String.raw `f \left( t \right) = \sin{t}`,

  ATTACK_LATEX: String.raw `f \left( t \right) = t`,
  ATTACK_TIME:  1,

  RELEASE_LATEX: String.raw `f \left( t \right) = \frac{e^{1-t}-1}{e-1}`,
  RELEASE_TIME:  1,
};
