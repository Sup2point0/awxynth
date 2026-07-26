# Troubleshooting

### I’ve found a bug!
Ouch, please [drop an issue on GitHub] and I’ll try get it fixed, thanks :D

### My graph isn’t showing!
If you aren’t seeing a “!” error in Desmos, check the following:

- Make sure you only have **one** definition for $f()$.
- Make sure your $f$ only accepts **one** parameter, like $f(t)$ or $f(x)$.
- Make sure all other variables you use within $f$ are defined, such as $k$ or $A$.

To repair it, you can try switching to a different preset. If that doesn’t fix it, it’s probably an internal bug =(

### My sound isn’t updating with my graph!
This usually means Awxynth has encountered a $\text{NaN}$ or $\text{undefined}$ somewhere. Make sure your graph hasn’t got undefined points, like a division by zero.

Awxynth should be able to handle undefined points, but sometimes it breaks. (I’m diagnosing it!)

### My graph doesn’t sound how I expected it to!
Ok, either:

### That *is* how your graph sounds! Music is weird :0
Something’s gone wrong with my sampling. Please report the bug!

### My audio keeps clipping!
It happens! You can turn down the **Master Volume** in the navbar.

### Ahh, lag!
Oh dear. It could be an Awxynth issue or a your device issue. I haven’t yet got to the major optimisation stage, so for now, you’ll just have to tone down how much you’re doing...

### My audio sounds broken!
Oh dear. I can only recommend reloading the page.
