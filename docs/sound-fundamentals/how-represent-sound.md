# How do we represent sound?

So the air particles are oscillating, great. We can plot those oscillations over time as a graph, like so:

```desmos
/dark
/desmos{
  expressionsCollapsed: true,
}
/viewport{ bottom: -2, top: 2 }

y = \sin(x)
```

Here, the $x$-axis is time, and the $y$-axis is *displacement*, meaning how far the particle has moved away from its original position. We call this graph a ***waveform***.

As a soundwave propogates through the air, the particles it passes through oscillate following the waveform. Animating this will make it a little clearer:

```desmos
/dark
/desmos{
  expressionsCollapsed: true,
}
/viewport{ bottom: -2, top: 2 }

/colour{ BLUE } /no-line :: \min(0,\ \sin(x-3t))\le y\le\max(0,\ \sin(x-3t))\ \{0\le x\}
/line{ opacity: 0.2 } :: y = \sin(x-3t) \{ x < 0 \}
/colour{ BLUE } :: y = \sin( x-3t ) \{ x > 0 \}
/point{ size: 16 } :: (0,\ \sin(0-3t))

t = \{ t_2 < 0:\ 2\pi - t_1,\ t_1 \}
/anim /slider{ min: 0,       max: "\\pi" } :: t_1 = 0
/anim /slider{ min: "-\\pi", max: "\\pi" } :: t_2 = 0
```

It’s just like ocean waves – imagine you’re swimming in the ocean and waves pass by you. You bob up and down along with the wave, but overall you don’t much much.

Waveforms can look however we want, and interesting waveforms are how we get interesting sounds!

```desmos
/dark
/desmos{
  expressionsCollapsed: true,
}
/viewport{ bottom: -2, top: 2 }

/hide :: f(x) = \sum_{n=1}^{4}\frac{1}{n}\sin(n^{2}x)

/colour{ BLUE } /no-line :: \min(0,\ f(x-3t))\le y\le\max(0,\ f(x-3t))\ \{0\le x\}
/line{ opacity: 0.2 } :: y = f(x-3t) \{ x < 0 \}
/colour{ BLUE } :: y = f(x-3t) \{ x > 0 \}
/point{ size: 16 } :: (0,\ f(0-3t))

t = \{ t_2 < 0:\ 2\pi - t_1,\ t_1 \}
/anim /slider{ min: 0,       max: "\\pi" } :: t_1 = 0
/anim /slider{ min: "-\\pi", max: "\\pi" } :: t_2 = 0
```

