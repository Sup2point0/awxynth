# Common Gotchas

### You need oscillation!
If your waveform has no movement at all, you won’t hear anything! $f(t) = 1$ isn’t the ‘loudest’ sound, it’s got no volume because it means the *air stays still* when played.

```desmos
/dark
/desmos{
  expressionsCollapsed: true
}
/hide :: f(x) = 1

/line{ opacity: 0.2 } :: y=f(x-3t)\{x<0\}
y=f(x-3t)\{x>0\}
/point{ size: 16 } :: (0,\ f(0-3t))

t = \{ t_2 < 0:\ 2\pi - t_1,\ t_1 \}
/anim /slider{ min: 0,       max: "\\pi" } :: t_1 = 0
/anim /slider{ min: "-\\pi", max: "\\pi" } :: t_2 = 0
```

### There’s no difference between positive and negative frequencies
It’s just a useful way to think about oscillation! In the real world, whether that air particle bobs up or bobs down makes no difference to our ears. These sine waves actually sound identical to us:

```desmos
/dark
/desmos{
  expressionsCollapsed: true
}
/hide :: f(x) = \sin(x)

/colour{ BLUE } /no-line :: \min(0,\ f(x-3t))\le y\le\max(0,\ f(x-3t))\ \{0\le x\}
/line{ opacity: 0.2 } :: y=f(x-3t)\{x<0\}
/colour{ BLUE } :: y=f(x-3t)\{x>0\}
/point{ size: 16 } :: (0,\ f(0-3t))

t = \{ t_2 < 0:\ 2\pi - t_1,\ t_1 \}
/anim /slider{ min: 0,       max: "\\pi" } :: t_1 = 0
/anim /slider{ min: "-\\pi", max: "\\pi" } :: t_2 = 0
```

```desmos
/dark
/desmos{
  expressionsCollapsed: true
}
/hide :: f(x) = \sin(x-\pi)

/colour{ BLUE } /no-line :: \min(0,\ f(x-3t))\le y\le\max(0,\ f(x-3t))\ \{0\le x\}
/line{ opacity: 0.2 } :: y=f(x-3t)\{x<0\}
/colour{ BLUE } :: y=f(x-3t)\{x>0\}
/point{ size: 16 } :: (0,\ f(0-3t))

t = \{ t_2 < 0:\ 2\pi - t_1,\ t_1 \}
/anim /slider{ min: 0,       max: "\\pi" } :: t_1 = 0
/anim /slider{ min: "-\\pi", max: "\\pi" } :: t_2 = 0
```

If you make your waveform only positive without any negative areas, it won’t sound any different to any other waveform. It’ll just be quieter, since you’re only using half of the available headroom.
