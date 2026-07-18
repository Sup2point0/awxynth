import { Note } from "#scripts/types";
import type { int, Scalar, Amplitude, Seconds, Latex, OctavedNoteRepr } from "#scripts/types";
import { INTERNAL, DEFAULTS, NOTE_FREQUENCIES, MIN_OCTAVE, MAX_OCTAVE, FUNC_SAMPLE_RES } from "#scripts/const";

import { SvelteMap } from "svelte/reactivity";


/** A chain of audio nodes applied to a played note. */
interface NoteNodeChain
{
  osc: AudioBufferSourceNode;
  attack: GainNode;
  release: GainNode;
}


/**
 * A synthesiser.
 * 
 * `.*_latex` fields store raw LaTeX source for a shaper. `.*_amps` fields store amplitude-over-time sample data of a shaper, containing `FUNC_SAMPLE_RES` points.
 */
export class Synth
{
  ctx:    AudioContext | null = null
  master: GainNode | null = null

  gain:   Scalar = $state(DEFAULTS.GAIN)
  octave: int    = $state(DEFAULTS.OCTAVE)

  active_notes = new SvelteMap<OctavedNoteRepr, NoteNodeChain>()

  // == OSCILLATORS == //
  osc1_latex: Latex       = $state(DEFAULTS.OSC)
  osc1_amps:  Amplitude[] = []
  osc1_gain:  Amplitude   = DEFAULTS.GAIN

  // == ADSR ENVELOPE == //
  attack_latex: Latex       = $state(DEFAULTS.ATTACK_LATEX)
  attack_amps:  Amplitude[] = []
  attack_time:  Seconds     = DEFAULTS.ATTACK_TIME

  release_latex: Latex       = $state(DEFAULTS.RELEASE_LATEX)
  release_amps:  Amplitude[] = []
  release_time:  Seconds     = DEFAULTS.RELEASE_TIME


  get now() {
    return this.ctx?.currentTime ?? 0;
  }


  /**
   * Setup the synthesiser.
   */
  init()
  {
    if (this.ctx) return;

    this.ctx = new AudioContext();
    this.ctx.resume();
    
    this.master = new GainNode(this.ctx, { gain: INTERNAL.MAX_GAIN });
    this.master.connect(this.ctx.destination);
  }

  /**
   * Start playing `note` at `octave`, using the synth's current oscillators and attack shaper.
   * 
   * Call `.stop()` with the same note to end it.
   */
  start(note: Note, octave: int)
  {
    if (octave < MIN_OCTAVE || octave > MAX_OCTAVE) return;
    if (this.active_notes.has(repr(note, octave))) return;

    let nodes = this.create_note(note, octave);
    if (nodes == undefined) return;

    nodes.osc.start();
    this.active_notes.set(repr(note, octave), nodes);
  }

  /**
   * Stop playing `note` at `octave`, using the synth's current release shaper.
   */
  stop(note: Note, octave: int)
  {
    if (octave < MIN_OCTAVE || octave > MAX_OCTAVE) return;

    let nodes = this.active_notes.get(repr(note, octave));
    if (nodes == undefined) return;

    nodes.attack.gain.cancelScheduledValues(this.now);
    nodes.release.gain.setValueCurveAtTime(this.release_amps, this.now, this.release_time);
    nodes.osc.stop(this.now + this.release_time + 0.5);

    this.active_notes.delete(repr(note, octave));
  }

  /**
   * Force stop all current oscillators, without applying release envelopes. For killing hanging oscillators.
   * */
  stop_all()
  {
    for (let nodes of this.active_notes.values()) {
      nodes.osc.stop();
    }

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

    for (let [note_repr, nodes] of this.active_notes) {
      note_reprs.push(note_repr);
      nodes.osc.stop();
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

  private create_note(note: Note, octave: int): NoteNodeChain | undefined
  {
    if (this.ctx == null) { console.error("Internal Error: no AudioContext set"); return; }
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

    let level = new GainNode(this.ctx, { gain: this.osc1_gain });

    let attack = new GainNode(this.ctx);
    attack.gain.setValueCurveAtTime(this.attack_amps, this.now, this.attack_time);

    let release = new GainNode(this.ctx, {
      gain: Math.min(1.0, this.release_amps[0]),
    });

    osc.connect(level);
    level.connect(attack);
    attack.connect(release);
    release.connect(this.master!);

    return { osc, attack, release };
  }
}


/** The global synthesiser instance. */
export const synth = new Synth();


function repr(note: Note, octave: int): OctavedNoteRepr
{
  return `${note}${octave}`;
}
