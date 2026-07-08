import type { int } from "#scripts/types";
import { Note } from "#scripts/types";
import { PITCHES } from "#scripts/const";


export class Synth
{
  ctx: AudioContext | null = null;

  /**
   * Setup the synthesiser.
   * 
   * This is idempotent!
   */
  init()
  {
    if (this.ctx) return;

    this.ctx = new AudioContext();

    this.ctx.resume();
  }

  play(note: Note, octave: int)
  {
    if (!this.ctx) return;

    console.log(`playing ${Note[note]} of octave ${octave}`);
    
    let real = new Float32Array(4096);
    let imag = new Float32Array(4096);

    for (let x = 1; x < 4096; x += 2) {
      imag[x] = 4.0 / (Math.PI * x);
    }

    let wavetable = this.ctx.createPeriodicWave(real, imag);
    
    let osc = this.ctx.createOscillator();
    osc.setPeriodicWave(wavetable);
    osc.connect(this.ctx.destination);

    osc.frequency.value = PITCHES[octave][note];
    osc.start();

    setTimeout(() => osc.stop(), 1000);
  }
}


export const synth = new Synth();
