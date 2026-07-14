import { Note } from "#scripts/types";
import type { int, latex, OctavedNoteRepr } from "#scripts/types";
import { DEFAULTS, PITCHES } from "#scripts/const";

import { SvelteSet } from "svelte/reactivity";


export class Synth
{
  ctx: AudioContext | null = null;

  active_notes = new SvelteSet<OctavedNoteRepr>();

  wave: latex = $state(DEFAULTS.WAVE);

  env: latex = $state(DEFAULTS.ENV);

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
    
    let buffer = this.ctx.createBuffer(1, 1000, 44100);
    let channel = buffer.getChannelData(0);

    for (let i = 0; i < channel.length; i++) {
      channel[i] = Math.random() * 2 - 1;
    }

    let osc = this.ctx.createBufferSource();
    osc.buffer = buffer;
    osc.connect(this.ctx.destination);

    osc.start();
    this.active_notes.add(`${note}${octave}`);

    setTimeout(() => {
      osc.stop()
      this.active_notes.delete(`${note}${octave}`);
    }, 100);
  }
}


export const synth = new Synth();
