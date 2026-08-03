import { Colour, Shaper, ShaperInstance } from "#scripts/types";

import * as PRESETS from "#scripts/const/presets";
import type { GraphBounds, Seconds } from "#scripts/types";


export class AttackShaper
  extends Shaper<AttackShaper, AttackInstance>
{
  override clip_on = $state(true)

  /** How long the attack envelope lasts. */
  duration: Seconds = $state(1.0)


  override colour = Colour.BLUE
  override bounds = $derived({
    x: [0, this.duration],
    y: [0, 1],
  }) as GraphBounds
  
  override params = {
    duration: "duration"
  }
  override presets = PRESETS.attacks
  override preset = $state(PRESETS.attacks.builtins[0])


  constructor()
  {
    super("ATTACK");
  }


  override create(ctx: AudioContext): AttackInstance
  {
    return new AttackInstance(ctx, this);
  }
}


export class AttackInstance
  extends ShaperInstance<AttackShaper, AttackInstance, GainNode>
{
  constructor(ctx: AudioContext, shaper: AttackShaper)
  {
    super(ctx, new GainNode(ctx), shaper);
    this.update();
  }


  update()
  {
    this.node.gain.cancelScheduledValues(this.ctx.currentTime);
    this.node.gain.setValueCurveAtTime(this.shaper.amps, this.ctx.currentTime, this.shaper.duration);
  }
}
