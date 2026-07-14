import { Note } from "#scripts/types";
import type { int, Amplitude, Latex, OctavedNoteRepr } from "#scripts/types";
import { FUNC_SAMPLE_RES, DEFAULTS, NOTE_FREQUENCIES } from "#scripts/const";

import { SvelteSet } from "svelte/reactivity";


export class Synth
{
  ctx: AudioContext | null = null;

  octave: int = $state(DEFAULTS.OCTAVE);

  active_notes = new SvelteSet<OctavedNoteRepr>();

  /**
   * LaTeX source of the synth's wave function.
   */
  wave_latex: Latex = $state(DEFAULTS.WAVE);

  /**
   * Amplitude-over-time data of the synth's wave function.
   * 
   * The array must be `FUNC_SAMPLE_RES` long.
   */
  wave_amps: Amplitude[] = [];

  /**
   * LaTeX source of the synth's ADSR envelope function.
   */
  env_latex: Latex = $state(DEFAULTS.ENV);
  
  /**
   * Amplitude-over-time data of the synth's ADSR envelope function.
   * 
   * The array must be `FUNC_SAMPLE_RES` long.
   */
  env_amps: Amplitude[] = [];

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

  /**
   * Play `note` at `octave`, using the synth's current wave and envelope functions.
   */
  play(note: Note, octave: int)
  {
    let osc = this.create_note(note, octave);
    if (osc == undefined) return;

    osc.start();
    this.active_notes.add(`${note}${octave}`);

    setTimeout(() => {
      osc.loop = false;
      osc.stop();
      this.active_notes.delete(`${note}${octave}`);
    }, 5000);
  }

  private create_note(note: Note, octave: int): AudioBufferSourceNode | undefined
  {
    if (!this.ctx) { window.alert("Internal Error: no AudioContext set"); return; }
    if (this.wave_amps.length === 0) { window.alert("Internal Error: wave data is absent"); return; }
    if (this.env_amps.length === 0) { window.alert("Internal Error: envelope data is absent"); return; }

    let frequency = NOTE_FREQUENCIES[octave][note] ?? 400;  // FIXME
    
    let buffer = this.ctx.createBuffer(1, 44100, 44100);
    let channel = buffer.getChannelData(0);

    for (let i = 0; i < 44100; i++) {
      let progress = frequency * i / 44100;
      let idx = (progress * FUNC_SAMPLE_RES) % FUNC_SAMPLE_RES;
      channel[i] = this.wave_amps[Math.floor(idx)];
    }

    console.log(`channel =`, channel);

    let osc = this.ctx.createBufferSource();
    osc.buffer = buffer;
    // osc.loop = true;

    // let gain = this.ctx.createGain();

    // osc.connect(gain);
    // gain.connect(this.ctx.destination);
    osc.connect(this.ctx.destination);

    return osc;
  }
}


export const synth = new Synth();
