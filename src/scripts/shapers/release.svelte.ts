import { Shaper, ShaperInstance } from "./shaper.svelte.ts";

import * as PRESETS from "#scripts/const/presets";
import { Colour } from "#scripts/types";
import type { Seconds, ScheduledTime } from "#scripts/types";


export class ReleaseShaper
  extends Shaper<ReleaseShaper, ReleaseInstance>
{
  override colour = Colour.PURPLE
  
  override clip_on = $state(true)
  
  /** How long the release envelope lasts. */
  duration: number

  presets = PRESETS.releases

  preset = $state(PRESETS.releases.builtins[3])
  
  
  constructor(duration: Seconds)
  {
    super("RELEASE");
    this.duration = $state(duration);
  }


  create(ctx: AudioContext): ReleaseInstance
  {
    return new ReleaseInstance(ctx, this);
  }
}


export class ReleaseInstance
  extends ShaperInstance<ReleaseShaper, ReleaseInstance, GainNode>
{
  constructor(ctx: AudioContext, shaper: ReleaseShaper)
  {
    super(ctx, new GainNode(ctx), shaper);
  }


  override drop(): ScheduledTime
  {
    let now = this.ctx.currentTime;

    this.node.gain.setValueCurveAtTime(this.shaper.amps, now, this.shaper.duration);
    
    return now + this.shaper.duration;
  }
}
