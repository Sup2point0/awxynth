# Changelog


<div class="changelog-layout">


## 4 August 2026

### ***Feature***
Additional parameters for shapers have been implemented. You can now tweak the duration of envelopes!

### ***Feature***
**Fundamentals of Sound** help pages have now been fleshed out, complete with Desmos embeds, so you can learn all about how sound works!


## 3 August 2026

### *Fix*
Those $\text{NaN}$ values were only being sanitised when clipping was enabled for a shaper. Now they’re always made safe, as well as `undefined` and `null` values!


## 2 August 2026

### *Fix*
$\text{NaN}$ values are now treated as $0$ to avoid crashing the synth for functions with undefined points.

### *Fix*
Attempted to diagnose an issue with the Master Pane crashing.


## 27 July 2026

### ***Feature***
Fleshed out the overlay screen for adding new shapers.

### *Fix*
Degrade gracefully instead of crashing when Desmos API is not available.

### *Fix*
Fixed positioning of Master Pane.


## 26 July 2026

### ***Feature***
The frequency spectrum visualiser now has a fancy gradient and logarithmic frequency scale!

### *Fix*
Fixed issue with the master meter crashing.

### *Fix*
Use RMS loudness in master meter for more natural levels.


## 25 July 2026

### ***Feature***
Your entire expression list is now synced, so you can use as many expressions as you’d like!

### ***Feature***
New output analysers, starting with a frequency spectrum visualiser!

### ***Feature***
Our first proper transform is here – **Distortion**!


## 24 July 2026

### ***Feature***
You can now toggle entire shaper chains on and off!

### *Fix*
Skip release-time transforms when they are disabled.

### *Fix*
UI fixes to be more consistent and efficient all-round.


## 23 July 2026

### **Change**
Major behind-the-scenes restructuring, in preparation for arbitrary transform routing 😱

### ***Feature***
You can now add more oscillators!

### ***Feature***
You can now toggle oscillators on and off!

### *Fix*
Fixed a nasty off-by-1 error resulting in $\text{NaN}$ values that crash the synth!


## 20 July 2026

### *Fix*
Fixed the audio clicking issue when holding down a note!


## 19 July 2026

### ***Feature***
We’ve now got randomised tips and a slick animation on the landing page!

### ***Feature***
Added **Clip** toggle for shapers to keep their values in $[-1.0, 1.0]$. Also added **Show Raw** toggle to view the difference before and after clipping.

### ***Feature***
Added presets for oscillators and envelopes.

### ***Feature***
Added a level meter in the top-left.

### **Change**
Clip Attack and Release by default (since this is generally the behaviour you want).


## 18 July 2026

### ***Feature***
Attack and release envelopes are now working!

### ***Feature***
Pressing space now force stops all notes, for the odd circumstance where a note may be left hanging.

### **Change**
Desmos windows now have their own themed colours.

### **Change**
Settled on vertical row-by-row UI layout with a reorderable transform sequence. Maybe a grid layout for multiple oscillators chains could work too?


## 15 July 2026

### ***Feature***
Notes now play while you hold the key down, instead of for a fixed duration :D


## 14 July 2026

### ***Feature***
You can now play any arbitrary waveform as sound. Woohoo!


## 8 July 2026

### ***Feature***
You can now play notes on the virtual piano keyboard by pressing keys on your physical computer keyboard!


## 8 July 2026

###
Project started!


</div>
