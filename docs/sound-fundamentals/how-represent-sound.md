# How do we represent sound?

So the air particles are oscillating, great. We can plot those oscillations over time as a graph, like so:

```desmos
y = \sin\left(x\right)
```

Here, the $x$-axis is time, and the $y$-axis is *displacement*, meaning how far the particle has moved away from its original position. We call this graph a ***waveform***.

As a soundwave propogates through the air, the particles it passes through oscillate following the waveform. Animating this will make it a little clearer:

```desmos
{ latex: String.raw`y = \sin\left( x-3t \right) \left\{ x < 0 \right\}`, lineOpacity: 0.2 }
{ latex: String.raw`y = \sin\left( x-3t \right) \left\{ x > 0 \right\}` }
{ latex: String.raw`\left( 0,\ \sin\left( 0-3t \right) \right)`, pointSize: 16 }
t = \left\{ t_2 < 0:\ 2\pi - t_1,\ t_1 \right\}
{ latex: "t_1 = 0", sliderBounds: { min: 0, max: "\\pi" }, playing: true }
{ latex: "t_2 = 0", sliderBounds: { min: "-\\pi", max: "\\pi" }, playing: true }
```

It’s just like ocean waves – imagine you’re swimming in the ocean and waves pass by you. You bob up and down along with the wave, but overall you don’t much much.

Waveforms can look however we want, and interesting waveforms are how we get interesting sounds!

```desmos
{ hidden: true, latex: String.raw`f\left(x\right) = \sum_{n=1}^{4}\frac{1}{n}\sin\left(n^{2}x\right)` }

{ latex: String.raw`y=f\left(x-3t\right)\left\{x<0\right\}`, lineOpacity: 0.2 }
{ latex: String.raw`y=f\left(x-3t\right)\left\{x>0\right\}` }
{ latex: String.raw`\left(0,\ f\left(0-3t\right)\right)`, pointSize: 16 }

t = \left\{ t_2 < 0:\ 2\pi - t_1,\ t_1 \right\}
{ latex: "t_1 = 0", sliderBounds: { min: 0, max: "\\pi" }, playing: true }
{ latex: "t_2 = 0", sliderBounds: { min: "-\\pi", max: "\\pi" }, playing: true }
```

