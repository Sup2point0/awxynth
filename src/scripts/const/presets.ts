import type { ShaperPreset } from "#scripts/types";


export const PRESETS: {
  WAVES: ShaperPreset[];
} =
{
  WAVES: [
    {
      title: "Sine",
      latex: String.raw `f\left(t\right) = \sin \left( t \right)`,
    },
    {
      title: "Saw",
      latex: String.raw `f\left(t\right) = \operatorname{mod}\left(\frac{t-\pi}{\pi},\ 2\right)-1`,
    },
    {
      title: "Square",
      latex: String.raw `f\left(t\right) = \operatorname{sign}\left(t-\pi\right)`,
    },
    {
      title: "Triangle",
      latex: String.raw `f\left(t\right) = 1-2\left|\frac{t-\pi}{\pi}\right|`,
    },
    {
      title: "Double Sine",
      latex: String.raw `f\left(t\right) = -\frac{\sin t+\sin2t}{\sqrt{3}}`,
    },
  ],
};
