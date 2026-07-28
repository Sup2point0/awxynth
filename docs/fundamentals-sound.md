# Fundamentals of Sound

Whether you’re a mathematician, music producer, both, or neither, this page provides a unified explanation of how sound works to get you started with Awxynth.

Why go so deep? Because Awxynth combines sound engineering and mathematics, the real way to unlock its potential is to have a deep intuition for both.

I won’t assume any knowledge here, so we’ll cover the basics to the full theory; feel free to skim to what’s most relevant to you. Also please don’t feel you need to read it all in one go; stuff like this can take time (and practical ~~messing around~~ experience!) to digest and internalise.

Heads up: I’m not a sound professional, just a casual music producer and maths fan. I do think I know what I’m talking about, but this *is* gonna be unsourced so all I can offer is a “trust me bro” :]


## What is sound?

When we ‘hear’ sound, we’re actually *feeling* the movement of air particles. As the particles bump against our eardrums, that’s turned into electrical impulses that our brain then translates to ‘sound’.

Specifically, those particles movements are *vibrations*, or *oscillations*: the particles are moving back-and-forth, not just in a single direction.

> A <soundwave> isn’t literally moving particles towards our ears – it’s only making particles vibrate and bump into each other. But that transfers *energy*, which is fundamentally what a soundwave is.

What particular sound we hear depends on how those air particles oscillate.


## How do we represent sound?

So the air particles are oscillating, great. We can plot those oscillations over time as a graph, like so:

DESMOS

Here, the $x$-axis is time, and the $y$-axis is *displacement*, meaning how far the particle has moved away from its original position. We call this graph a <waveform>.

As a soundwave propogates through the air, the particles it passes through oscillate following the waveform. Animating this will make it a little clearer:

DESMOS

It’s just like ocean waves – imagine you’re swimming in the ocean and waves pass by you. You bob up and down along with the wave, but for the most part, you stay still.


## What is frequency?

So how does this all tie in to *music*? When you play an A note, why do we hear a particular pitch, and how can we tell it’s different to a C note?

It comes down to the <frequency> of the waveform. Frequency describes how often something occurs per second, with the unit $\text{Hz}$. For instance, if you read 240 words per minute, you could say you have a reading speed of 240 / 60 = 4 Hz.

In sound, frequency describes how often the waveform **repeats**. For instance, take a look at the signal below; notice how it’s formed of the same waveform repreated over and over:

DESMOS

We’ve repeated 440 cycles in a second, so this has a frequency of 440 Hz.

If we decrease the frequency, see what happens:

DESMOS

The waveform becomes ‘stretched’, because the particles oscillate slower.

On the flip side, if we increase the frequency:

DESMOS

The waveform appears to ‘compress’, as the particles oscillate extremely fast.

Pretty simple, right? If it oscillates slowly, it’s low-pitched (low frequency), if it oscillates quickly, it’s high-pitched (high frequency).

Our human ears can hear frequencies as low as about 20 Hz, and as high as about 20,000 Hz (though we naturally (and unnaturally) fall off as we age).


## How do we hear frequencies?

Aha, but I over-simplified! Frequency is a little more complex...

There’s some very cool mathematics which means that any waveform – *any* waveform – can be broken down into a lot of sine waves layered together. Each sine wave has different frequencies, and added together, they form the original waveform, no matter how rich or complex.

DESMOS

But it’s not just mathematics; this is *literally* how we hear sound: our ears have tubes that decompose sounds into sine waves of frequencies from 20 Hz to 20,000 Hz.

What this means, is that really, the only true waveform is a sine wave! When we hear these weird and complex waveforms, we’re effectively hearing many, many pure sine waves at once.

> “Why sine waves??” I hear you ask. I’m no expert, but in short, it’s the universe’s natural solution to simple harmonic motion, which is how things in physics oscillate (sound familiar?) – including the hairs in our ears that detecy frequencies.

Now the crux: each of these sine waves has their own particular frequency. So if we’re hearing all of them, then we aren’t hearing only one frequency. We’re hearing **all of them at once**.

This means non-sine waveforms are composed of **multiple frequencies**, not just one. And it’s those higher frequencies (called <harmonics>) that shape the sound and give it its character.

Here’s a demonstration so you can see for yourself this is real. As you increase $N$, more sine waves are added, and you’ll (listen carefully!) be able to hear the new frequency. But as you add more and more... after a point you stop being able to discern the new frequencies, and instead you perceive the entire *character* of the sound changing.

DESMOS

If this has blown your mind, awesome! This is one of the most important concepts to wrap your head around, but it really unlocks all of the theory and logic behind sound processing and mixing.


## Common Gotchas

### You need oscillation!
If your waveform has no movement at all, you won’t hear anything! $f(t) = 1$ isn’t the ‘loudest’ sound, it’s got no volume because it means the *air stays still* when played.

### There’s no difference between positive and negative frequencies
It’s just a useful way to think about oscillation! In the real world, whether that air particle bobs up or bobs down makes no difference to our ears. These saw waves actually sound identical to us:

DESMOS

If you make your waveform only positive without any negative areas, it won’t sound any different to any other waveform. It’ll just be quieter, since you’re only using half of the available headroom.