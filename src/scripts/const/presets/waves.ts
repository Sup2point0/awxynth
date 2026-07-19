import type { ShaperPreset } from "#scripts/types";


export const waves: Record<string, ShaperPreset[]> =
{
  core: [
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
  ],
  simple: [
    {
      title: "Double Sine",
      latex: String.raw `f\left(t\right) = -\frac{\sin t+\sin2t}{\sqrt{3}}`,
    },
    {
      title: "Jagged Sine",
      latex: String.raw `f\left(t\right) = \left|2\sin\left(\frac{t}{2}\right)\right|-1`,
    },
    {
      title: "Half Saw",
      latex: String.raw `f\left(t\right) = \frac{2t}{\pi} - 1`,
    },
    {
      title: "Jagged Saw",
      latex: String.raw `f\left(t\right) = \operatorname{mod}\left(\frac{t}{\pi},\ 1\right)\operatorname{sign}\left(\pi-t\right)`,
    },
  ],
  mathematical: [
    {
      title: "Tangent",
      latex: String.raw `f\left(t\right) = \tan\left(t\right)`,
    },
    {
      title: "Logarithm",
      latex: String.raw `f\left(t\right) = \log_{\pi}\left( \frac{t}{2} \right)`,
    },
    {
      title: "Secant",
      latex: String.raw `f\left(t\right) = \frac{\sec\left( \frac{t}{2} \right)}{8}`,
    },
    {
      title: "Gaussian",
      latex: String.raw `f\left(t\right) = 2e^{-\frac{1}{2}\left(t-\pi\right)^{2}}-1`,
    },
    {
      title: "Sineco",
      latex: String.raw `f\left(t\right) = \sin\left( \cos\left( t \right)\right)`,
    },
    {
      title: "Smooth Sine",
      latex: String.raw `f\left(t\right) = \frac{1}{\sin\left(\sin\left(\sin\left(\sin\left(1\right)\right)\right)\right)}\sin\left(\sin\left(\sin\left(\sin\left(\sin\left(t\right)\right)\right)\right)\right)`,
    },
  ],
  wacky: [
    {
      title: "Audiovisual",
      latex: String.raw `f\left(t\right) = \left(\left|2\sin t\right|-1\right)\operatorname{sign}\left(\pi-t\right)`,
    },
    {
      title: "Dampened Spring",
      latex: [
        String.raw `f\left(t\right) = \frac{\sin\left( kt \right)}{t}`,
        String.raw `k = 2`,
      ],
    },
    {
      title: "Slingshot",
      latex: String.raw `f\left(t\right) = \int_{1}^{t}\frac{\ln x}{x}dx-1`,
    },
    {
      title: "Humpback",
      latex: String.raw `f\left(t\right) = \frac{1}{2}\left(t-1\right)\sqrt{\sin\left(\frac{t}{2}\right)}-\frac{\sqrt{2}}{2}`,
    },
    {
      title: "Joyride",
      latex: String.raw `f\left(t\right) = \frac{2}{e-e^{-1}}\left(e^{\sin t}-\frac{e+e^{-1}}{2}\right)`,
    },
    {
      title: "Accordion",
      latex: String.raw `f\left(t\right) = \frac{\sqrt{2}}{\pi}\sum_{n=1}^{k}\frac{1}{k+1-n}\sin\left(\sin\left(nx\right)\right)`,
    },
    {
      title: "Bing Bong",
      latex: String.raw `f\left(t\right) = \sin\left( t^3 \right)`,
    },
    {
      title: "Sine Squeeze",
      latex: String.raw `f\left(t\right)=\min\left(\max\left(\sin\left(4t\right),\ \left(\frac{t}{\pi}-1\right)\operatorname{sign}\left(\pi-t\right)\right),\ \left(\frac{t}{\pi}-1\right)\operatorname{sign}\left(t-\pi\right)\right)`,
    },
    {
      title: "Spastic Spring",
      latex: [
        String.raw `f\left(t\right) = \sin\left( t^k \right)`,
        String.raw `k = 2`
      ],
    },
  ],
};
