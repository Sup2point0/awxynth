import { Colour } from "#scripts/types";
import type { Scalar, Amplitude, ScheduledTime, ShaperPreset } from "#scripts/types";


/**
 * A shaper in the synth chain, which may be either an oscillator or transform.
 * 
 * This class stores only a shaper's *parameters*. To use the shaper, call `.create()` to construct a `ShaperInstance` which can be freely manipulated. This is so that multiple simultaneous notes can apply their shapers without disrupting each other.
 */
export abstract class Shaper<
  Original extends Shaper<Original,Instance>         = any,
  Instance extends ShaperInstance<Original,Instance> = any
>
{
  /** Displayed name of the shaper. */
  title: string = "SHAPER"

  /** Colour associated with the shaper for title and graph. */
  colour: string = Colour.GREEN

  /** Should the shaper be applied in the processing chain? */
  enabled: boolean = $state(true)

  /** Should hard clipping be applied to clamp `.amps` to within the shaper's codomain? */
  clip_on: boolean = $state(false)

  /** How strong to apply the shaper. `[0.0, 1.0]`, with `0.0` dry and `1.0` wet. */
  mix: Scalar = $state(1.0)

  /** Sampled y-over-x values of the shaper function (if relevant). */
  amps: Amplitude[] = []

  abstract presets: Record<string, ShaperPreset[]>

  abstract preset: ShaperPreset

  #subscribers: Array<(self: Original) => void> = []


  constructor(title?: string)
  {
    if (title != undefined) {
      this.title = title;
    }
  }


  /**
   * Create a `ShaperInstance` for playing a note.
   */
  abstract create(ctx: AudioContext, ...args: any[]): Instance;

  /**
   * Subscribe to changes on this `Shaper`.
   */
  subscribe(callback: (self: Original) => void)
  {
    this.#subscribers.push(callback);
  }

  /**
   * Apply all the callbacks subscribed to changes on this `Shaper`.
   */
  protected update_subscribers()
  {
    for (let subscriber of this.#subscribers) {
      subscriber(this as unknown as Original);
    }
  }
}


/**
 * A standalone instance of a `Shaper` that holds a reference back to the original in `.shaper` but can be freely modified.
 * 
 * Most instances require a backing `.node: AudioNode` that actually produces the effect, but a few exceptions will modify the audio pipeline in other ways, in which case their `.node` is `null`.
 */
export abstract class ShaperInstance<
  Original extends Shaper<Original,Instance>         = any,
  Instance extends ShaperInstance<Original,Instance> = any,
  Node extends AudioNode | null                      = any
>
{
  /** Reference to the `Shaper` that created this instance. */
  shaper: Original;

  ctx: AudioContext;

  /** Backing `AudioNode` to apply settings to.
   * 
   * `null` if this shaper instance does not require an individual node (it might influence the pipeline in different ways).
   */
  node: Node;


  constructor(ctx: AudioContext, node: Node, shaper: Original)
  {
    this.ctx = ctx;
    this.node = node;
    this.shaper = shaper;
  }


  /**
   * Connect this shaper's backing `AudioNode` (if any) to `node`.
   */
  connect(node: AudioNode)
  {
    this.node?.connect(node);
  }

  /**
   * Apply any required shaping when a note is released. If the shaper should be applied, this returns the scheduled time for when the oscillator can be `.stop()`-d.
   * 
   * Child classes should override this only if they have on-release shaping to apply.
   */
  drop(): ScheduledTime | undefined
  {
    return undefined;
  }
}
