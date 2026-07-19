Welcome to *Awxynth*, **the mathematical synthesiser!**

> Note: *Awxynth* is currently under development – expect some bits to be unfinished or missing!

In conventional synthesisers, you pick from preset waveforms (or draw them if you’re lucky!), drag points to shape your envelopes and LFOs, and apply built-in effects.

In Awxynth, **you create your own everything**, using the power of mathematical functions. If you can find a function for it, you can hear it. It’s less abstracted, but you unlock total freedom in how you create, manipulate, and morph your sounds!


## Quickstart

Awxynth is designed to both be straightforward and provide total freedom.

The overall structure is **one flat pipeline**. Each stage takes in input, transforms it, and feeds its output to the next.

At the start are your ***oscillators***, where you should supply ***wave*** functions. You start with 1 oscillator, and you can add more if desired.

The rest is any number of sequential ***transforms***. These morph your sounds in all sorts of ways, defined by their ***shaper*** function. You start with the all-important ADSR envelope, and you can add and reorder more however you wish.


## Technicals

Waves and shapers are defined by exactly one function $f$.

For waves, $f$ takes in a phase and returns an amplitude, i.e. $f : [0, 2\pi] \to [-1.0, 1.0]$.

For shapers, the output is still an amplitude, i.e. $f : T \to [-1.0, 1.0]$. The input domain $T$ varies depending on the shaper; some are phase $[0, 2\pi]$, some are also amplitude $[-1.0, 1.0]$, and some are time $[0.0, \infin]$.

Awxynth picks the **first** definition it comes across of a function named $f$ with one parameter. You can call the parameter anything you want, so $f(x)$, $f(t)$, etc. are all fine. <!-- TODO You can also define as many additional helpers and expressions alongside $f$ as needed. Just make sure you have (preferably one) $f$ for Awxynth to use! -->

Currently, $f$ must not have any external dependencies. Support for defining additional expressions is coming!

Awxynth currently only handles $x$-to-$y$ functions. Support for implicit graphs, parametric graphs, and polygons would be ideal, but is unfortunately probably infeasible.
