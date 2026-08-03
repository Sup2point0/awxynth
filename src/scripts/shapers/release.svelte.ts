import { Shaper, ShaperInstance } from "#scripts/types";

import * as PRESETS from "#scripts/const/presets";
import { Colour } from "#scripts/types";
import type { Seconds, ScheduledTime } from "#scripts/types";


export class ReleaseShaper
  extends Shaper<ReleaseShaper, ReleaseInstance>
{
  override clip_on = $state(true)
  
  /** How long the release envelope lasts. */
  duration: Seconds = $state(1.0)

  
  override colour = Colour.PURPLE
    override bounds = $derived({
      x: [0, this.duration],
      y: [0, 1],
    }) as GraphBounds
    
  override params = {
    duration: "duration"
  }
  override presets = PRESETS.releases
  override preset = $state(PRESETS.releases.builtins[3])
  
  
  constructor()
  {
    super("RELEASE");
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
