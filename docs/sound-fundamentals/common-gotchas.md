# Common Gotchas

### You need oscillation!
If your waveform has no movement at all, you won’t hear anything! $f(t) = 1$ isn’t the ‘loudest’ sound, it’s got no volume because it means the *air stays still* when played.

```desmos
{ hidden: true, latex: String.raw`f\left(x\right) = 1` }

{ latex: String.raw`y=f\left(x-3t\right)\left\{x<0\right\}`, lineOpacity: 0.2 }
{ latex: String.raw`y=f\left(x-3t\right)\left\{x>0\right\}` }
{ latex: String.raw`\left(0,\ f\left(0-3t\right)\right)`, pointSize: 16 }

t = \left\{ t_2 < 0:\ 2\pi - t_1,\ t_1 \right\}
{ latex: "t_1 = 0", sliderBounds: { min: 0, max: "\\pi" }, playing: true }
{ latex: "t_2 = 0", sliderBounds: { min: "-\\pi", max: "\\pi" }, playing: true }
```

### There’s no difference between positive and negative frequencies
It’s just a useful way to think about oscillation! In the real world, whether that air particle bobs up or bobs down makes no difference to our ears. These sine waves actually sound identical to us:

```desmos
{ hidden: true, latex: String.raw`f\left(x\right) = \sin\left(x\right)` }

{ latex: String.raw`y=f\left(x-3t\right)\left\{x<0\right\}`, lineOpacity: 0.2 }
{ latex: String.raw`y=f\left(x-3t\right)\left\{x>0\right\}` }
{ latex: String.raw`\left(0,\ f\left(0-3t\right)\right)`, pointSize: 16 }

t = \left\{ t_2 < 0:\ 2\pi - t_1,\ t_1 \right\}
{ latex: "t_1 = 0", sliderBounds: { min: 0, max: "\\pi" }, playing: true }
{ latex: "t_2 = 0", sliderBounds: { min: "-\\pi", max: "\\pi" }, playing: true }
```

```desmos
{ hidden: true, latex: String.raw`f\left(x\right) = \sin\left(x-\pi\right)` }

{ latex: String.raw`y=f\left(x-3t\right)\left\{x<0\right\}`, lineOpacity: 0.2 }
{ latex: String.raw`y=f\left(x-3t\right)\left\{x>0\right\}` }
{ latex: String.raw`\left(0,\ f\left(0-3t\right)\right)`, pointSize: 16 }

t = \left\{ t_2 < 0:\ 2\pi - t_1,\ t_1 \right\}
{ latex: "t_1 = 0", sliderBounds: { min: 0, max: "\\pi" }, playing: true }
{ latex: "t_2 = 0", sliderBounds: { min: "-\\pi", max: "\\pi" }, playing: true }
```

If you make your waveform only positive without any negative areas, it won’t sound any different to any other waveform. It’ll just be quieter, since you’re only using half of the available headroom.
