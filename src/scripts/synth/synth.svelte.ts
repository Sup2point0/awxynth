import { OscillatorShaper, OscillatorInstance } from "#scripts/shapers";
import type { Shaper, ShaperInstance } from "#scripts/types";

import { INTERNAL, DEFAULTS, NOTE_FREQUENCIES, MIN_OCTAVE, MAX_OCTAVE } from "#scripts/const";
import { Note } from "#scripts/types";
import type { Octave, Scalar, OctavedNoteRepr, ScheduledTime } from "#scripts/types";

import { SvelteMap } from "svelte/reactivity";


export interface ShaperChain
{
  title: string;
  colour: string;
  disabled: boolean;
  shapers: Shaper[];
}


/**
 * Oscillator and transforms for a currently playing note.
 */
interface ShaperInstanceChain
{
  oscillators: OscillatorInstance[];
  transforms: ShaperInstance<any, any>[];
}


/**
 * A synthesiser.
 * 
 * `.init()` must be called client-side before using the synth in any way!
 */
export class Synth
{
  /* NOTE: These fields are initialised client-side with `.init()` */
  ctx!:      AudioContext
  master!:   GainNode
  analyser!: AnalyserNode

  oscillators: OscillatorShaper[] = $state(DEFAULTS.OSCILLATORS)
  transforms: Array<ShaperChain> = $state(DEFAULTS.TRANSFORMS)

  active_notes = new SvelteMap<OctavedNoteRepr, ShaperInstanceChain>()

  gain:   Scalar = $state(DEFAULTS.GAIN)
  octave: Octave = $state(DEFAULTS.OCTAVE)


  /**
   * Setup the synthesiser client-side with its `AudioContext`.
   */
  init()
  {
    if (this.ctx != undefined) return;

    this.ctx      = new AudioContext();
    this.master   = new GainNode(this.ctx, { gain: INTERNAL.MAX_GAIN });
    this.analyser = new AnalyserNode(this.ctx);

    this.ctx.resume();
    this.master.connect(this.analyser);
    this.master.connect(this.ctx.destination);
  }
  
  now(): ScheduledTime {
    return this.ctx?.currentTime ?? 0;
  }


  // == PLAYBACK == //

  /**
   * Start playing `note` at `octave`, using the synth's current oscillators and attack shaper.
   * 
   * Call `.stop()` with the same note to end it.
   */
  start(note: Note, octave: Octave)
  {
    if (octave < MIN_OCTAVE || octave > MAX_OCTAVE) return;
    if (this.active_notes.has(repr(note, octave))) return;

    let chain = this.create_note(note, octave);
    if (chain == undefined) return;

    for (let osc of chain.oscillators) {
      osc.node.start();
    }
    this.active_notes.set(repr(note, octave), chain);
  }

  /**
   * Stop playing `note` at `octave`, first applying any release shapers before stopping the oscillator.
   */
  stop(note: Note, octave: Octave)
  {
    if (octave < MIN_OCTAVE || octave > MAX_OCTAVE) return;

    let chain = this.active_notes.get(repr(note, octave));
    if (chain == undefined) return;

    let scheduled_release = this.now();

    for (let transform of chain.transforms) {
      if (!transform.shaper.enabled) continue;

      let release_time = transform.drop();

      if (release_time == undefined) continue;
      if (release_time < scheduled_release) continue;
      scheduled_release = release_time;
    }

    for (let osc of chain.oscillators) {
      osc.node.stop(scheduled_release);
    }
    this.active_notes.delete(repr(note, octave));
  }

  /**
   * Immediately stop playing `note` at `octave`, skipping any release shapers.
   */
  private force_stop(repr: OctavedNoteRepr, chain: ShaperInstanceChain)
  {
    for (let osc of chain.oscillators) {
      osc.node.stop();
    }
    this.active_notes.delete(repr);
  }

  /**
   * Immediately stop playing all currently active notes, skipping any release shapers.
   * */
  stop_all()
  {
    for (let [repr, chain] of this.active_notes) {
      this.force_stop(repr, chain);
    }
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

    for (let [repr, chain] of this.active_notes) {
      note_reprs.push(repr);
      this.force_stop(repr, chain);
    }

    switch (direction) {
      case "down": this.octave--; break;
      case "up":   this.octave++; break;
    }

    for (let repr of note_reprs) {
      let { note, octave } = derepr(repr);
      
      switch (direction) {
        case "down": octave--; break;
        case "up":   octave++; break;
      }

      this.start(note, octave);
    }
  }


  // == EXTERNAL == //

  /**
   * Add a new oscillator to the synth.
   */
  new_oscillator()
  {
    // TODO check limits

    this.oscillators.push(
      new OscillatorShaper(`OSCILLATOR ${this.oscillators.length + 1}`)
    );
  }


  // == INTERNAL == //

  private create_note(note: Note, octave: Octave): ShaperInstanceChain | undefined
  {
    if (this.ctx == null) { console.error("Internal Error: no AudioContext set"); return; }

    // setup
    const freq = NOTE_FREQUENCIES[octave][note];
    if (freq == undefined) return;

    let oscillators = [];
    let levels = [];
    let transforms = [];

    let enabled_oscillators = this.oscillators.filter(osc => osc.enabled);

    for (let osc of enabled_oscillators) {
      let instance = osc.create(this.ctx, freq);
      let level = new GainNode(this.ctx, { gain: osc.mix });
      instance.connect(level);

      oscillators.push(instance);
      levels.push(level);
    }

    let fan_in = new GainNode(this.ctx, { gain: 1 / enabled_oscillators.length });

    // connect
    for (let level of levels) {
      level.connect(fan_in);
    }
    
    let prev = fan_in as { connect: (node: AudioNode) => void };

    for (let group of this.transforms) {
      if (group.disabled) continue;
      
      for (let transform of group.shapers) {
        if (!transform.enabled) continue;

        let instance = transform.create(this.ctx);
        transforms.push(instance);

        prev.connect(instance.node);
        prev = instance;
      }
    }

    prev.connect(this.master!);

    return { oscillators, transforms };
  }
}


/** The global synthesiser instance. */
export const synth = new Synth();


function repr(note: Note, octave: Octave): OctavedNoteRepr
{
  return `${note}${octave}`;
}

function derepr(repr: OctavedNoteRepr): { note: Note, octave: Octave }
{
  let note = repr.slice(0, -1) as Note;
  let octave = Number(repr.at(-1)!) as Octave;

  return { note, octave };
}
