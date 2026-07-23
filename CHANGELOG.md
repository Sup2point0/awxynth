# Changelog

<!--

Fix:
- Variables needed for function not synced between editor and window

Todo:
• animate progression along envelope
• transform: amplitude clamper
• legato
• adding oscillators
• global volume
• enable/disable components
• allow clicking keys in virtual keyboard
• zoom editor windows horizontally
• panning
• adding transforms

-->


<div class="changelog-layout">


## 23 July 2026

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
