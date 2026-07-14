/**
 * Defaults for a synth.
 */
export const DEFAULTS =
{
  WAVE: String.raw `\sin{t}`,
  ENV: String.raw `\frac{e^{1-t}-1}{e-1}`,
};
