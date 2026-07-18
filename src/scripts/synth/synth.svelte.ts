import { Note } from "#scripts/types";
import type { int, Amplitude, Latex, OctavedNoteRepr } from "#scripts/types";
import { INTERNAL, DEFAULTS, NOTE_FREQUENCIES, MIN_OCTAVE, MAX_OCTAVE, FUNC_SAMPLE_RES } from "#scripts/const";

import { SvelteMap } from "svelte/reactivity";


/**
 * A synthesiser.
 * 
 * `.*_latex` fields store raw LaTeX source for a shaper. `.*_amps` fields store amplitude-over-time sample data of a shaper, containing `FUNC_SAMPLE_RES` points.
 */
export class Synth
{
  ctx: AudioContext | null = null;

  octave: int = $state(DEFAULTS.OCTAVE);

  active_notes = new SvelteMap<OctavedNoteRepr, AudioBufferSourceNode>();

  // == OSCILLATORS == //
  osc1_latex: Latex = $state(DEFAULTS.WAVE);
  osc1_amps: Amplitude[] = [];

  // == ADSR ENVELOPE == //
  attack_latex: Latex = $state(DEFAULTS.ATTACK);
  attack_amps: Amplitude[] = [];

  release_latex: Latex = $state(DEFAULTS.RELEASE);
  release_amps: Amplitude[] = [];


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
    if (octave < MIN_OCTAVE || octave > MAX_OCTAVE) return;
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
    if (!this.ctx) { console.error("Internal Error: no AudioContext set"); return; }
    if (this.osc1_amps.length === 0) { console.error("Internal Error: oscillator 1 shaper data is absent"); return; }
    if (this.attack_amps.length === 0) { console.error("Internal Error: attack shaper data is absent"); return; }
    if (this.release_amps.length === 0) { console.error("Internal Error: release shaper data is absent"); return; }

    let frequency = NOTE_FREQUENCIES[octave][note];
    if (frequency == undefined) return;
    
    let buffer = this.ctx.createBuffer(1, 44100, 44100);
    let channel = buffer.getChannelData(0);

    for (let i = 0; i < 44100; i++) {
      let progress = frequency * i / 44100;
      let idx = (progress * FUNC_SAMPLE_RES) % FUNC_SAMPLE_RES;
      channel[i] = this.osc1_amps[Math.floor(idx)];
    }

    let osc = this.ctx.createBufferSource();
    osc.buffer = buffer;
    osc.loop = true;

    let max_gain = this.ctx.createGain();
    max_gain.gain.setValueAtTime(INTERNAL.MAX_GAIN, this.ctx.currentTime);

    osc.connect(max_gain);
    max_gain.connect(this.ctx.destination);
    osc.connect(this.ctx.destination);

    return osc;
  }

  private repr(note: Note, octave: int): OctavedNoteRepr
  {
    return `${note}${octave}`;
  }
}


/** The global synthesiser instance. */
export const synth = new Synth();
