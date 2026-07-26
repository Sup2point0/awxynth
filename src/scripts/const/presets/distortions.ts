import ltx from "#scripts/utils";

import { presets } from "./shared";


export const distortions = presets(
{
  builtins: [
    {
      title: "Linear",
      latex: [
        ltx `f\left(t\right)=At+k`,
        { latex: ltx `A = 1.25`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 0`, sliderBounds: { min: 0, max: 1 } },
      ],
    },
    {
      title: "Arctan",
      latex: [
        ltx `f\left(t\right)=A\frac{\tan^{-1}\left(kDt\right)}{\tan^{-1}\left(k\right)}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: "0.001" } },
      ],
    },
    {
      title: "Hyperbolic",
      latex: [
        ltx `f\left(t\right)=\frac{A\tanh\left(kDt\right)}{\tanh\left(k\right)}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: "0.001" } },
      ],
    },
    {
      title: "Reciprocal (concave)",
      latex: [
        ltx `f\left(t\right)=A\frac{\left(1-\frac{1}{1+kDt}\right)}{1-\frac{1}{1+k}}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: "0.001" } },
      ],
    },
    // TODO reciprocal convex
    {
      title: "Exponential (concave)",
      latex: [
        ltx `f\left(t\right)=A\left(Dt\right)^{\frac{1}{k}}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: "0.001" } },
      ],
    },
    {
      title: "Exponential (convex)",
      latex: [
        ltx `f\left(t\right)=A\left(Dt\right)^{k}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: "0.001" } },
      ],
    },
    {
      title: "Circular (concave)",
      latex: [
        ltx `f\left(t\right)=A\sqrt{1-\left(Dt-1\right)^{2}}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
      ],
    },
    {
      title: "Circular (convex)",
      latex: [
        ltx `f\left(t\right)=A\left(1-\sqrt{1-\left(Dt\right)^{2}}\right)`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
      ],
    },
  ],
  mathematical: [
    {
      title: "Logarithmic (concave)",
      latex: [
        ltx `f\left(t\right)=A\left(\frac{1}{k}\ln\left(Dt\left(1-e^{-k}\right)+e^{-k}\right)+1\right)`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: "0.001" } },
      ],
    },
    {
      title: "Logarithmic (convex)",
      latex: [
        ltx `f\left(t\right)=A\frac{e^{k\left(Dt-1\right)}-e^{-k}}{1-e^{-k}}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: "0.001" } },
      ],
    },
    {
      title: "Sine",
      latex: [
        ltx `f\left(t\right)=A\sin\left(\frac{\pi}{2}\min\left(Dt,1\right)\right)^{k}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: "0.001" } },
      ],
    },
    {
      title: "Arcsine",
      latex: [
        ltx `f\left(t\right)=A\left(\frac{2}{\pi}\sin^{-1}\left(Dt-1\right)+1\right)^{k}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: "0.001" } },
      ],
    },
    {
      title: "Sigmoid",
      latex: [
        ltx `f\left(t\right)=A\frac{1}{1+e^{-\left(10k\left(Dt-\frac{1}{2}\right)\right)}}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: "0.001" } },
      ],
    },
    {
      title: "Inverse Sigmoid",
      latex: [
        ltx `f\left(t\right)=A\left(\frac{1}{10k}\ln\left(\frac{1}{1-Dt}-1\right)+\frac{1}{2}\right)`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: "0.001" } },
      ],
    },
    {
      title: "Arcsecant",
      latex: [
        ltx `f\left(t\right)=A\frac{\sec^{-1}\left(Dkt+1\right)}{\sec^{-1}\left(k+1\right)}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: "0.001" } },
      ],
    },
  ],
  wacky: [
    {
      title: "Sine Bounce",
      latex: [
        ltx `f\left(t\right)=A\left|\sin\left(D\pi t\right)\right|^{k}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: 0, max: 1 } },
      ],
    },
    {
      title: "Saw Slice",
      latex: [
        ltx `f\left(t\right)=A\operatorname{mod}\left(Dt+k,1\right)`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 2`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 0`, sliderBounds: { min: "0.001" } },
      ],
    },
    {
      title: "Sine-Saw",
      latex: [
        ltx `f\left(t\right)=At\left|\sin\left(8\pi Dt\right)\right|^{k}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: "0.001" } },
      ],
    },
  ],
});
