import { ltx } from "#scripts/utils";

import { presets } from "./shared";


export const attacks = presets(
{
  builtins: [
    {
      title: "Linear",
      latex: ltx `f \left( t \right) = t`,
    },
    {
      title: "Exponential",
      latex: ltx `f \left( t \right) = \frac{e^{t}-1}{e-1}`,
    },
    {
      title: "Reciprocal (concave)",  // FIXME
      latex: ltx `f\left(t\right) = \frac{3}{4}\left(2-\frac{1}{t+0.5}\right)`,
    },
    {
      title: "Reciprocal (convex)",
      latex: ltx `f\left(t\right) = \frac{3}{4}\left(-\frac{1}{t-1.5}-\frac{2}{3}\right)`,
    },
    {
      title: "Sine (concave)",
      latex: ltx `f\left(t\right) = \sin\left(\frac{\pi t}{2}\right)`,
    },
    {
      title: "Sine (convex)",
      latex: ltx `f\left(t\right) = \sin\left(\frac{\pi t-\pi}{2}\right)+1`,
    },
    {
      title: "Arcsine (concave)",
      latex: ltx `f\left(t\right) = \frac{2}{\pi}\arcsin\left(t-1\right)+1`,
    },
    {
      title: "Arcsine (convex)",
      latex: ltx `f\left(t\right) = \frac{2}{\pi}\arcsin\left(t\right)`,
    },
    {
      title: "Circular (concave)",
      latex: ltx `f\left(t\right) = \sqrt{1-\left(t-1\right)^{2}}`,
    },
    {
      title: "Circular (convex)",
      latex: ltx `f\left(t\right) = 1-\sqrt{1-t^{2}}`,
    },
  ],
});


export const releases = presets(
{
  builtins: [
    {
      title: "Linear",
      latex: ltx `f\left(t\right) = 1 - t`,
    },
    {
      title: "Exponential",
      latex: ltx `f\left(t\right) = \frac{e^{1-t}-1}{e-1}`,
    },
    {
      title: "Reciprocal (concave)",
      latex: ltx `f\left(t\right) = \frac{2}{3}\left(\frac{2}{3t-4}\right)+\frac{4}{3}`,
    },
    {
      title: "Reciprocal (convex)",
      latex: ltx `f\left(t\right) = \frac{2}{3}\left(\frac{2}{3t+1}-\frac{1}{2}\right)`,
    },
    {
      title: "Sine (concave)",
      latex: ltx `f\left(t\right) = \sin\left(\frac{\pi\left(t+1\right)}{2}\right)`,
    },
    {
      title: "Sine (convex)",
      latex: ltx `f\left(t\right) = \sin\left(\frac{\pi\left(t+2\right)}{2}\right)+1`,
    },
    {
      title: "Arcsine (concave)",
      latex: ltx `f\left(t\right) = \frac{2}{\pi}\arcsin\left(-t\right)+1`,
    },
    {
      title: "Arcsine (convex)",
      latex: ltx `f\left(t\right) = \frac{2}{\pi}\arcsin\left(1-t\right)`,
    },
    {
      title: "Circular (concave)",
      latex: ltx `f\left(t\right) = \sqrt{1-t^{2}}`,
    },
    {
      title: "Circular (convex)",
      latex: ltx `f\left(t\right) = 1-\sqrt{1-\left(t-1\right)^{2}}`,
    },
  ],
});
