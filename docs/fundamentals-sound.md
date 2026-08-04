# Fundamentals of Sound

Whether you’re a mathematician, music producer, both, or neither, this page provides a unified explanation of how sound works to get you started with Awxynth.

Why go so deep? Because Awxynth combines sound engineering and mathematics, the real way to unlock its potential is to have a deep intuition for both.

I won’t assume any knowledge here, so we’ll cover the basics to the full theory; feel free to skim to what’s most relevant to you. Also please don’t feel you need to read it all in one go; stuff like this can take time (and practical ~~messing around~~ experience!) to digest and internalise.

> Heads up: I’m not a sound professional, just a casual music producer and maths fan. I do think I know what I’m talking about, but this *is* gonna be unsourced so all I can offer is a “trust me bro” :]


## What is sound?

When we ‘hear’ sound, we’re actually *feeling* the movement of air particles. As the particles bump against our eardrums, that’s turned into electrical impulses that our brain then translates to ‘sound’.

Specifically, those particles movements are *vibrations*, or *oscillations*: the particles are moving back-and-forth, not just in a single direction.

> A ***soundwave*** isn’t literally moving particles towards our ears – it’s only making particles vibrate and bump into each other. But that transfers *energy*, which is fundamentally what a soundwave is.

What particular sound we hear depends on how those air particles oscillate.


## How do we represent sound?

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


## What is frequency?

So how does this all tie in to *music*? When you play an $\text{A}$ note, why do we hear a particular pitch, and how can we tell it’s different to a $\text{C}$ note?

It comes down to the ***frequency*** of the waveform. Frequency describes how often something occurs per second, with the unit $\text{Hz}$. For instance, if you read 240 words per minute, you could say you have a reading speed of $240 / 60 = 4 \text{ Hz}$.

In sound, frequency describes how often the waveform **repeats**. For instance, take a look at the signal below; notice how it’s formed of the same waveform repreated over and over:

```desmos
-\frac{\pi}{f}\le x\le\frac{\pi}{f}
y=\sin\left(fx\right)
f=4
```

If in the span of 1 second we have 440 cycles, then the frequency of our overall waveform is $440 \text{ Hz}$.

If we decrease the frequency, see what happens:

```desmos
-\frac{\pi}{f}\le x\le\frac{\pi}{f}
y=\sin\left(fx\right)
f=2
```

The waveform becomes ‘stretched’, because the particles oscillate slower.

On the flip side, if we increase the frequency:

```desmos
-\frac{\pi}{f}\le x\le\frac{\pi}{f}
y=\sin\left(fx\right)
f=8
```

The waveform appears to ‘compress’, as the particles oscillate extremely fast.

Pretty simple, right? If it oscillates slowly, it’s low-pitched (low frequency), if it oscillates quickly, it’s high-pitched (high frequency).

```desmos
{ hidden: true, latex: String.raw`f_1\left(x\right)=2+\sin\left(6x\right)` }
{ latex: String.raw`y=f_1\left(x-3t\right)\left\{x<0\right\}`, lineOpacity: 0.2 }
{ latex: String.raw`y=f_1\left(x-3t\right)\left\{x>0\right\}` }
{ latex: String.raw`\left(0,\ f_1\left(0-3t\right)\right)`, pointSize: 16, label: "High Pitch", showLabel: true }

{ hidden: true, latex: String.raw`f_2\left(x\right)=-2+\sin\left(x\right)` }
{ latex: String.raw`y=f_2\left(x-3t\right)\left\{x<0\right\}`, lineOpacity: 0.2 }
{ latex: String.raw`y=f_2\left(x-3t\right)\left\{x>0\right\}` }
{ latex: String.raw`\left(0,\ f_2\left(0-3t\right)\right)`, pointSize: 16, label: "Low Pitch", showLabel: true }

t = \left\{ t_2 < 0:\ 2\pi - t_1,\ t_1 \right\}
{ latex: "t_1 = 0", sliderBounds: { min: 0, max: "\\pi" }, playing: true }
{ latex: "t_2 = 0", sliderBounds: { min: "-\\pi", max: "\\pi" }, playing: true }
```

Our human ears can hear frequencies as low as about $20 \text{ Hz}$, and as high as about $\text{20,000 Hz}$ (though we naturally (and unnaturally) fall off as we age).


## How do we hear frequencies?

Aha, but I over-simplified! Frequency is (just a little) more complex than that...

There’s some very cool mathematics which means that any waveform – *any* waveform – can be broken down into **a lot of sine waves layered together**.

It’s just like how words can be broken down into individual letters. Turns out, sine waves are the **alphabet of sound**.

Each sine wave has different frequencies, and added together, they form the original waveform, no matter how rich or complex. Take this complex-looking waveform:

```desmos
f_{1}\left(x\right)+f_{2}\left(x\right)+f_{3}\left(x\right)

{ hidden: true, latex: String.raw`f_{1}\left(x\right)=0.5\sin x` }
{ hidden: true, latex: String.raw`f_{2}\left(x\right)=0.2\sin\left(2.5x\right)` }
{ hidden: true, latex: String.raw`f_{3}\left(x\right)=0.05\sin\left(40x\right)` }
```

It’s actually composed of these 3 sine waves:

```desmos
f_{1}\left(x\right)+2
f_{2}\left(x\right)
f_{3}\left(x\right)-2

{ hidden: true, latex: String.raw`f_{1}\left(x\right)=0.5\sin x` }
{ hidden: true, latex: String.raw`f_{2}\left(x\right)=0.2\sin\left(2.5x\right)` }
{ hidden: true, latex: String.raw`f_{3}\left(x\right)=0.05\sin\left(40x\right)` }
```

Hopefully you can see how the overall waveform combines the characteristics of its constituent waveforms.

But it’s not just mathematics; this is *literally* how we hear sound: our ears have tubes that decompose sounds into sine waves of frequencies from $\text{20 Hz}$ to $\text{20,000 Hz}$.

What this means, is that really, the only true waveform is a sine wave! When we hear these weird and complex waveforms, we’re effectively hearing many, many pure sine waves at once.

> “Why sine waves??” I hear you ask. I’m no expert, but in short, it’s the universe’s natural solution to simple harmonic motion, which is how things in physics oscillate (sound familiar?) – including the hairs in our ears that detect frequencies.

Now the crux: each of these sine waves has their own particular frequency. So if we’re hearing all of them, then we aren’t hearing only one frequency. We’re hearing **all of them at once**.

This means *non-sine* waveforms are composed of **multiple frequencies**, not just one. Generally, the lowest frequency gives the sound its **pitch**. Those higher frequencies, called ***harmonics***, give the sound its character.

Here’s a demonstration so you can see for yourself this is real. As you increase $N$, more sine waves are added, and you’ll (listen carefully!) be able to hear the new frequency. But as you add more and more... after a point you stop being able to discern the new frequencies, and instead you perceive the entire *character* of the sound changing.

```desmos
# { expressionsCollapsed: false, expressionsTopbar: true }
{ latex: String.raw`N=1`, sliderBounds: { min: 1, max: 40, step: 1 } }
\sum_{n=1}^{N}\frac{\left(-1\right)^{n}}{n}\sin\left(nx\right)
\left[\operatorname{tone}\left(330n,\ \frac{1}{n}\right)\operatorname{for}n=\left[1...N\right]\right]
```

If this has blown your mind, awesome! This is one of the most important concepts to wrap your head around, but it really unlocks all of the theory and logic behind sound processing and mixing.


## Common Gotchas

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
