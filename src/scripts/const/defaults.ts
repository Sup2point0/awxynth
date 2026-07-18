/**
 * Defaults for a synth.
 */
export const DEFAULTS =
{
  OCTAVE: 4,
  WAVE: String.raw `f \left( t \right) = \sin{t}`,
  ENV: String.raw `f \left( t \right) = \frac{e^{1-t}-1}{e-1}`,
};
