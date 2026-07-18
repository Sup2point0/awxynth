import { Note } from "#scripts/types";
import type { int, Amplitude, Latex, OctavedNoteRepr } from "#scripts/types";
import { NOTE_FREQUENCIES, MIN_OCTAVE, MAX_OCTAVE, FUNC_SAMPLE_RES, DEFAULTS } from "#scripts/const";

import { SvelteMap } from "svelte/reactivity";


export class Synth
{
  ctx: AudioContext | null = null;

  octave: int = $state(DEFAULTS.OCTAVE);

  active_notes = new SvelteMap<OctavedNoteRepr, AudioBufferSourceNode>();

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
   * Start playing `note` at `octave`, using the synth's current wave and envelope functions.
   * 
   * Call `.stop()` with the same note to end it.
   */
  start(note: Note, octave: int)
  {
    if (octave < MIN_OCTAVE || octave > MAX_OCTAVE) return;
    if (this.active_notes.has(this.repr(note, octave))) return;

    let osc = this.create_note(note, octave);
    if (osc == undefined) return;

    osc.start();
    this.active_notes.set(this.repr(note, octave), osc);
  }

  stop(note: Note, octave: int)
  {
    let osc = this.active_notes.get(this.repr(note, octave));
    if (osc == undefined) return;

    osc.stop();
    this.active_notes.delete(this.repr(note, octave));
  }

  /** Stop all current oscillators. For killing hanging oscillators. */
  stop_all()
  {
    this.active_notes.clear();
  }

  /**
   * Shift the synth one octave in `direction`. Also shifts all currently playing notes.
   * 
   * No-op if the octave would exceed the synth bounds.
   */
  transpose_octave(direction: "down" | "up")
  {
    if (direction === "down" && this.octave <= MIN_OCTAVE) return;
    if (direction === "up"   && this.octave >= MAX_OCTAVE) return;

    let note_reprs = [];

    for (let [note_repr, osc] of this.active_notes) {
      note_reprs.push(note_repr);
      osc.stop();
      this.active_notes.delete(note_repr);
    }

    switch (direction) {
      case "down": this.octave--; break;
      case "up":   this.octave++; break;
    }

    for (let note_repr of note_reprs) {
      let note = note_repr.slice(0, -1) as Note;
      let octave = Number(note_repr.at(-1)!);
      
      switch (direction) {
        case "down": octave--; break;
        case "up":   octave++; break;
      }

      this.start(note, octave);
    }
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

    let osc = this.ctx.createBufferSource();
    osc.buffer = buffer;
    osc.loop = true;

    // let gain = this.ctx.createGain();

    // osc.connect(gain);
    // gain.connect(this.ctx.destination);
    osc.connect(this.ctx.destination);

    return osc;
  }

  private repr(note: Note, octave: int): OctavedNoteRepr
  {
    return `${note}${octave}`;
  }
}


export const synth = new Synth();
