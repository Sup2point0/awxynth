# What is frequency?

So how does this all tie in to *music*? When you play an $\text{A}$ note, why do we hear a particular pitch, and how can we tell it’s different to a $\text{C}$ note?

It comes down to the ***frequency*** of the waveform. Frequency describes how often something occurs per second, with the unit $\text{Hz}$. For instance, if you read 240 words per minute, you could say you have a reading speed of $240 / 60 = 4 \text{ Hz}$.

In sound, frequency describes how often the waveform **repeats**. For instance, take a look at the signal below; notice how it’s formed of the same waveform repreated over and over:

```desmos
/dark
/desmos{
  expressionsCollapsed: true,
}

-\frac{\pi}{f}\le x\le\frac{\pi}{f}
y = \sin(fx)
f = 4
```

If in the span of 1 second we have 440 cycles, then the frequency of our overall waveform is $440 \text{ Hz}$.

If we decrease the frequency, see what happens:

```desmos
/dark
/desmos{
  expressionsCollapsed: true,
}

-\frac{\pi}{f}\le x\le\frac{\pi}{f}
y = \sin(fx)
f = 2
```

The waveform becomes ‘stretched’, because the particles oscillate slower.

On the flip side, if we increase the frequency:

```desmos
/dark
/desmos{
  expressionsCollapsed: true,
}

-\frac{\pi}{f}\le x\le\frac{\pi}{f}
y = \sin(fx)
f = 8
```

The waveform appears to ‘compress’, as the particles oscillate extremely fast.

Pretty simple, right? If it oscillates slowly, it’s low-pitched (low frequency), if it oscillates quickly, it’s high-pitched (high frequency).

```desmos
/dark
/desmos{
  expressionsCollapsed: true,
}

/hide :: f_1(x) = 2+\sin(6x)
/line{ opacity: 0.2 } :: y = f_1(x-3t)\{x<0\}
y = f_1(x-3t)\{x>0\}
/point{ size: 16 } /label{ text: "High Pitch", showLabel: true } :: (0,\ f_1(0-3t))

/hide :: f_2(x) = -2+\sin(x)
/line{ opacity: 0.2 } :: y = f_2(x-3t)\{x<0\}
y = f_2(x-3t)\{x>0\}
/point{ size: 16 } /label{ text: "Low Pitch", showLabel: true } :: (0,\ f_2(0-3t))

t = \{ t_2 < 0:\ 2\pi - t_1,\ t_1 \}
/anim /slider{ min: 0,       max: "\\pi" } :: t_1 = 0
/anim /slider{ min: "-\\pi", max: "\\pi" } :: t_2 = 0
```

Our human ears can hear frequencies as low as about $20 \text{ Hz}$, and as high as about $\text{20,000 Hz}$ (though we naturally (and unnaturally) fall off as we age).

