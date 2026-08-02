import { ltx } from "#scripts/utils";

import { define_presets } from "./shared";


export const waves = define_presets(
{
  core: [
    {
      title: "Sine",
      latex: ltx `f\left(t\right) = \sin \left( t \right)`,
    },
    {
      title: "Saw",
      latex: ltx `f\left(t\right) = \operatorname{mod}\left(\frac{t-\pi}{\pi},\ 2\right)-1`,
    },
    {
      title: "Square",
      latex: ltx `f\left(t\right) = \operatorname{sign}\left(t-\pi\right)`,
    },
    {
      title: "Triangle",
      latex: ltx `f\left(t\right) = \frac{2}{\pi}\sin^{-1}\left(\sin\left(t-\pi\right)\right)`,
    },
  ],
  simple: [
    {
      title: "Double Sine",
      latex: ltx `f\left(t\right) = -\frac{\sin t+\sin2t}{\sqrt{3}}`,
    },
    {
      title: "Jagged Sine",
      latex: ltx `f\left(t\right) = \left|2\sin\left(\frac{t}{2}\right)\right|-1`,
    },
    {
      title: "Half Saw",
      latex: ltx `f\left(t\right) = \frac{2t}{\pi} - 1`,
    },
    {
      title: "Jagged Saw",
      latex: ltx `f\left(t\right) = \operatorname{mod}\left(\frac{t}{\pi},\ 1\right)\operatorname{sign}\left(\pi-t\right)`,
    },
  ],
  mathematical: [
    {
      title: "Tangent",
      latex: ltx `f\left(t\right) = \tan\left(\frac{t}{2}\right)`,
    },
    {
      title: "Arctangent",
      latex: ltx `f\left(t\right) = \frac{2}{\pi}\tan^{-1}\left(2\left(t-\pi\right)\right)`,
    },
    {
      title: "Logarithm",
      latex: ltx `f\left(t\right) = \log_{\pi}\left( \frac{t}{2} \right)`,
    },
    {
      title: "Secant",
      latex: ltx `f\left(t\right) = \frac{\sec\left( \frac{t}{2} \right)}{8}`,
    },
    {
      title: "Gaussian",
      latex: ltx `f\left(t\right) = 2e^{-\frac{1}{2}\left(t-\pi\right)^{2}}-1`,
    },
    {
      title: "Sigmoid",
      latex: ltx `f\left(t\right) = \frac{2}{1+e^{\frac{\pi}{2}\left(\pi-t\right)}}-1`,
    },
    {
      title: "Choose",
      latex: ltx `f\left(t\right) = \operatorname{nCr}\left(-0.2,\pi\left(t-\pi\right)\right)`,
    },
    {
      title: "Sineco",
      latex: ltx `f\left(t\right) = \sin\left( \cos\left( t \right)\right)`,
    },
    {
      title: "Lifeline",
      latex: ltx `f\left(t\right) = \prod_{n=1}^{5}\sin\left(\left(2n-1\right)t\right)`,
    },
    {
      title: "Lopsided Sine",
      latex: ltx `f\left(t\right) = \sin\left(\sqrt{2\pi t}\right)`,
    },
    {
      title: "Smooth Sine",
      latex: ltx `f\left(t\right) = \frac{1}{\sin\left(\sin\left(\sin\left(\sin\left(1\right)\right)\right)\right)}\sin\left(\sin\left(\sin\left(\sin\left(\sin\left(t\right)\right)\right)\right)\right)`,
    },
    {
      title: "Smushed Sine",
      latex: ltx `f\left(t\right) = \sin\left(\frac{1}{0.2\left(t-\pi\right)}\right)`,
    },
    {
      title: "Very Smushed Sine",
      latex: ltx `f\left(t\right) = \sin\left(\tan\left(\frac{t}{2}\right)\right)`,
    },
    {
      title: "Dampened Spring",
      latex: [
        ltx `f\left(t\right) = \frac{\sin\left( kt \right)}{t}`,
        ltx `k = 2`,
      ],
    },
    {
      title: "Weierstrass",
      latex: ltx `f\left(t\right) = \frac{1}{\pi}\sum_{n=1}^{10}\frac{1}{n}\sin\left(\pi^{n}t\right)`,
    },
  ],
  wacky: [
    {
      title: "Audiovisual",
      latex: ltx `f\left(t\right) = \left(\left|2\sin t\right|-1\right)\operatorname{sign}\left(\pi-t\right)`,
    },
    {
      title: "Bell",
      latex: ltx `f\left(t\right) = \sum_{n=1}^{7}\frac{1}{\sqrt{2}n}\sin\left(nt\right)\sin\left(\cos\left(2^{n}t\right)\right)`,
    },
    {
      title: "Bounce",
      latex: ltx `f\left(t\right) = 2\sqrt{\frac{1-\cos\left(t-\pi\right)}{2}}-1`,
    },
    {
      title: "Bumpy Triangle",
      latex: ltx `f\left(t\right) = \sin\left(\cos\left(t\right)\right)\cos\left(\sin\left(t\right)\right)`,
    },
    {
      title: "Butterfly",
      latex: ltx `f\left(t\right) = \sin\left(t\right)\ln\left(\sin\left(t\right)^{2}\right)`,
    },
    {
      title: "Event Horizon",
      latex: ltx `f\left(t\right) = \sin\left(e^{\left(t-\pi\right)}\right)`,
    },
    {
      title: "Harmonic Acid",
      latex: [
        ltx `f\left(t\right)=w\left(t-k\right)`,
        { latex: `k = 0`, sliderBounds: { min: 0, max: ltx `2\pi` } },
        { latex: `R = 3`, sliderBounds: { min: 1, max: 5, step: 1 }},
        ltx `w\left(t\right)=\sum_{n=1}^{R}g\left(n,\frac{t}{2}\right)g\left(n+1,\frac{t}{2}\right)`,
        ltx `g\left(n,t\right)=\frac{1}{n}\sin\left(t^{n}\tan\left(n\sin\left(t\right)\right)\right)`,
      ],
    },
    {
      title: "Harmonics",
      latex: [
        ltx `f\left(t\right)=\frac{\sqrt{2}}{\pi}\sum_{n=1}^{R}\frac{1}{R+1-n}\sin\left(\sin\left(nt\right)\right)`,
        { latex: `R = 10`, sliderBounds: { min: 1, max: 20, step: 1 }},
      ],
    },
    {
      title: "Humpback",
      latex: ltx `f\left(t\right) = \frac{1}{2}\left(t-1\right)\sqrt{\sin\left(\frac{t}{2}\right)}-\frac{\sqrt{2}}{2}`,
    },
    {
      title: "Joyride",
      latex: ltx `f\left(t\right) = \frac{2}{e-e^{-1}}\left(e^{\sin t}-\frac{e+e^{-1}}{2}\right)`,
    },
    {
      title: "Kid’s Piano",
      latex: ltx `f\left(t\right)=\sin\left(16\pi\sin\left(t\right)\right)`,
    },
    {
      title: "Ladders",
      latex: ltx `f\left(t\right) = 2\operatorname{mod}\left(\frac{t^{2}}{2},\ 1\right)-1`,
    },
    {
      title: "Sine Squeeze",
      latex: ltx `f\left(t\right) = \min\left(\max\left(\sin\left(4t\right),\ \left(\frac{t}{\pi}-1\right)\operatorname{sign}\left(\pi-t\right)\right),\ \left(\frac{t}{\pi}-1\right)\operatorname{sign}\left(t-\pi\right)\right)`,
    },
    {
      title: "Slingshot",
      latex: ltx `f\left(t\right) = \int_{1}^{t}\frac{\ln x}{x}dx-1`,
    },
    {
      title: "Slinky",
      latex: ltx `f\left(t\right) = \sum_{n=0}^{2}\frac{\sin\left(n^{t}t\right)}{n+\ln2}`,
    },
    {
      title: "SoundCloud",
      latex: ltx `f\left(t\right)=-e^{\left(-\frac{1}{2}\left(t-\pi\right)^{2}\right)}\sin\left(10t\right)`,
    },
    {
      title: "Spastic Spring",
      latex: [
        ltx `f\left(t\right) = \sin\left( t^k \right)`,
        ltx `k = 2`,
      ],
    },
    {
      title: "Synthwave",
      latex: ltx `f\left(t\right) = \frac{v\sqrt{6}}{v^{4}+v^{2}+1}\operatorname{with}v=t-\pi`,
    },
    {
      title: "Treacherous Mountains",
      latex: [
        ltx `f\left(t\right)=\sum_{n=1}^{R}\frac{\sqrt{3}}{nt}\sin\left(t^{n}\sin^{-1}\left(\frac{t}{2\pi}\right)\right)`,
        { latex: `R = 2`, sliderBounds: { min: 1, max: 5, step: 1 } },
      ],
    },
    {
      title: "Twin Humps",
      latex: ltx `f\left(t\right) = \sqrt{5}ve^{-v^{2}}\operatorname{with}v=0.8\left(t-\pi\right)`,
    },
    {
      title: "Whee",
      latex: ltx `f\left(t\right) = t^{\sin t}-1`,
    },
  ],
  neuro: [
    {
      title: "Massive Squelchy",
      latex: ltx `f\left(t\right) = \sum_{n=1}^{10}\frac{1}{2^{n}}\sin\left(t^{n}\ln\left(1+nt\right)\right)`,
    },
    {
      title: "Organ",
      latex: ltx `f\left(t\right) = \sin\left(\sum_{n=1}^{7}\frac{1}{n}\sin\left(2^{n}t\right)\right)`,
    },
    {
      title: "Spectral",
      latex: [
        ltx `f\left(t\right)=w\left(t-k\right)`,
        { latex: `k = 0`, sliderBounds: { min: ltx `-\pi`, max: ltx `\pi` } },
        ltx `w\left(t\right)=e^{-\frac{1}{2}t}\sum_{n=1}^{6}\frac{t^{n}}{n^{n}}\sin\left(e^{n}t\right)`,
      ],
    },
    {
      title: "Tiny Squelchy",
      latex: ltx `f\left(t\right) = \sum_{n=1}^{4}\frac{1}{2^{n}}\sin\left(2\pi t^{n}\right)`,
    },
    {
      title: "Upsy Daisy",
      latex: ltx `f\left(t\right) = \sum_{n=1}^{5}\frac{1}{2^{n}}\sin\left(t\sin\left(n\sin\left(nt\right)\right)\right)`,
    },
    {
      title: "Wet",
      latex: ltx `f\left(t\right) = \sum_{n=1}^{10}\frac{1}{2^{n}}\sin\left(2^{n}t\right)\cos\left(t^{n}\right)`,
    },
  ],
  special: [
    {
      title: "Bing Bong",
      latex: ltx `f\left(t\right) = \sin\left( t^3 \right)`,
    },
  ],
});
