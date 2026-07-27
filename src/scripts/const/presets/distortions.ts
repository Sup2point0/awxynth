import ltx from "#scripts/utils";

import { presets } from "./shared";


export const distortions = presets(
{
  builtins: [
    {
      title: "Linear",
      latex: [
        ltx `f\left(x\right) = A\left(Dx+k\right)`,
        { latex: ltx `A = 1.25`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 0`, sliderBounds: { min: 0, max: 1 } },
      ],
    },
    {
      title: "Arctan",
      latex: [
        ltx `f\left(x\right) = A\frac{\tan^{-1}\left(kDx\right)}{\tan^{-1}\left(k\right)}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: 0.001 } },
      ],
    },
    {
      title: "Hyperbolic",
      latex: [
        ltx `f\left(x\right) = \frac{A\tanh\left(kDx\right)}{\tanh\left(k\right)}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: 0.001 } },
      ],
    },
    {
      title: "Reciprocal (concave)",
      latex: [
        ltx `f\left(x\right) = A\frac{\left(1-\frac{1}{1+kDx}\right)}{1-\frac{1}{1+k}}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: 0.001 } },
      ],
    },
    // TODO reciprocal convex
    {
      title: "Exponential (concave)",
      latex: [
        ltx `f\left(x\right) = A\left(Dx\right)^{\frac{1}{k}}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: 0.001 } },
      ],
    },
    {
      title: "Exponential (convex)",
      latex: [
        ltx `f\left(x\right) = A\left(Dx\right)^{k}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: 0.001 } },
      ],
    },
    {
      title: "Circular (concave)",
      latex: [
        ltx `f\left(x\right) = A\sqrt{1-\left(Dx-1\right)^{2}}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
      ],
    },
    {
      title: "Circular (convex)",
      latex: [
        ltx `f\left(x\right) = A\left(1-\sqrt{1-\left(Dx\right)^{2}}\right)`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
      ],
    },
  ],
  mathematical: [
    {
      title: "Logarithmic (concave)",
      latex: [
        ltx `f\left(x\right) = A\left(\frac{1}{k}\ln\left(Dx\left(1-e^{-k}\right)+e^{-k}\right)+1\right)`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: 0.001 } },
      ],
    },
    {
      title: "Logarithmic (convex)",
      latex: [
        ltx `f\left(x\right) = A\frac{e^{k\left(Dx-1\right)}-e^{-k}}{1-e^{-k}}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 2`, sliderBounds: { min: 0.001 } },
      ],
    },
    {
      title: "Sine",
      latex: [
        ltx `f\left(x\right) = A\sin\left(\frac{\pi}{2}\min\left(Dx,1\right)\right)^{k}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: 0.001 } },
      ],
    },
    {
      title: "Arcsine",
      latex: [
        ltx `f\left(x\right) = A\left(\frac{2}{\pi}\sin^{-1}\left(Dx-1\right)+1\right)^{k}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: 0.001 } },
      ],
    },
    {
      title: "Sigmoid",
      latex: [
        ltx `f\left(x\right) = A\frac{1}{1+e^{-\left(10k\left(Dx-\frac{1}{2}\right)\right)}}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: 0.001 } },
      ],
    },
    {
      title: "Inverse Sigmoid",
      latex: [
        ltx `f\left(x\right) = A\left(\frac{1}{10k}\ln\left(\frac{1}{1-Dx}-1\right)+\frac{1}{2}\right)`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: 0.001 } },
      ],
    },
    {
      title: "Arcsecant",
      latex: [
        ltx `f\left(x\right) = A\frac{\sec^{-1}\left(kDx+1\right)}{\sec^{-1}\left(k+1\right)}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: 0.001 } },
      ],
    },
  ],
  wacky: [
    {
      title: "Sine Bounce",
      latex: [
        ltx `f\left(x\right) = A\left|\sin\left(\pi Dx\right)\right|^{k}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: 0, max: 1 } },
      ],
    },
    {
      title: "Saw Slice",
      latex: [
        ltx `f\left(x\right) = A\operatorname{mod}\left(Dx+k,1\right)`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 2`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 0`, sliderBounds: { min: 0.001 } },
      ],
    },
    {
      title: "Sine Slice",
      latex: [
        ltx `f\left(x\right) = A\left|\sin\left(\pi k\left(Dx\right)^{2}\right)\right|`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 2`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: 1 } },
      ],
    },
    {
      title: "Sine-Saw",
      latex: [
        ltx `f\left(x\right) = Ax\left|\sin\left(8\pi Dx\right)\right|^{k}`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 1`, sliderBounds: { min: 0.001 } },
      ],
    },
    {
      title: "Rope Spool",
      latex: [
        ltx `f\left(x\right) = A\left(Dx+0.1x\sin\left(2\pi kDx\right)\right)`,
        { latex: ltx `A = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `D = 1`, sliderBounds: { min: 1 } },
        { latex: ltx `k = 5`, sliderBounds: { min: 0 } },
      ],
    },
  ],
});
