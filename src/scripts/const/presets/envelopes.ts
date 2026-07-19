import type { ShaperPreset } from "#scripts/types";


export const attacks: Record<string, ShaperPreset[]> =
{
  builtins: [
    {
      title: "Linear",
      latex: String.raw `f \left( t \right) = t`,
    },
    {
      title: "Exponential",
      latex: String.raw `f \left( t \right) = \frac{e^{1-t}-1}{e-1}`,
    },
  ],
};


export const releases: Record<string, ShaperPreset[]> =
{
  builtins: [
    {
      title: "Linear",
      latex: String.raw `f \left( t \right) = 1 - t`,
    },
    {
      title: "Exponential",
      latex: String.raw `f \left( t \right) = \frac{e^{1-t}-1}{e-1}`,
    },
  ],
};
