# How do we hear frequencies?

Aha, but I over-simplified! Frequency is (just a little) more complex than that...

There’s some very cool mathematics which means that any waveform – *any* waveform – can be broken down into **a lot of sine waves layered together**.

It’s just like how words can be broken down into individual letters. Turns out, sine waves are the **alphabet of sound**.

Each sine wave has different frequencies, and added together, they form the original waveform, no matter how rich or complex. Take this complex-looking waveform:

```desmos
f_{1}(x)+f_{2}(x)+f_{3}(x)

/hide :: f_{1}(x) = 0.5\sin x
/hide :: f_{2}(x) = 0.2\sin(2.5x)
/hide :: f_{3}(x) = 0.05\sin(40x)
```

It’s actually composed of these 3 sine waves:

```desmos
f_{1}(x)+2
f_{2}(x)
f_{3}(x)-2

/hide :: f_{1}(x)=0.5\sin x
/hide :: f_{2}(x)=0.2\sin(2.5x)
/hide :: f_{3}(x)=0.05\sin(40x)
```

Hopefully you can see how the overall waveform combines the characteristics of its constituent waveforms.

But it’s not just mathematics; this is *literally* how we hear sound: our ears have tubes that decompose sounds into sine waves of frequencies from $\text{20 Hz}$ to $\text{20,000 Hz}$.

What this means, is that really, the only true waveform is a sine wave! When we hear these weird and complex waveforms, we’re effectively hearing many, many pure sine waves at once.

> “Why sine waves??” I hear you ask. I’m no expert, but in short, it’s the universe’s natural solution to simple harmonic motion, which is how things in physics oscillate (sound familiar?) – including the hairs in our ears that detect frequencies.

Now the crux: each of these sine waves has their own particular frequency. So if we’re hearing all of them, then we aren’t hearing only one frequency. We’re hearing **all of them at once**.

This means *non-sine* waveforms are composed of **multiple frequencies**, not just one. Generally, the lowest frequency gives the sound its **pitch**. Those higher frequencies, called ***harmonics***, give the sound its character.

Here’s a demonstration so you can see for yourself this is real. As you increase $N$, more sine waves are added, and you’ll (listen carefully!) be able to hear the new frequency. But as you add more and more... after a point you stop being able to discern the new frequencies, and instead you perceive the entire *character* of the sound changing.

```desmos
/desmos{
  expressionsCollapsed: false,
  expressionsTopbar: true,
}

/slider{ min: 1, max: 40, step: 1 } :: N = 1
\sum_{n=1}^{N}\frac{(-1)^{n}}{n}\sin(nx)
[\operatorname{tone}(330n,\ \frac{1}{n})\operatorname{for}n=[1...N]]
```

If this has blown your mind, awesome! This is one of the most important concepts to wrap your head around, but it really unlocks all of the theory and logic behind sound processing and mixing.
