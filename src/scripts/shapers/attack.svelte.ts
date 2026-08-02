import { Shaper, ShaperInstance } from "#scripts/types";

import * as PRESETS from "#scripts/const/presets";
import { Colour, type Seconds } from "#scripts/types";


export class AttackShaper
  extends Shaper<AttackShaper, AttackInstance>
{
  override colour = Colour.BLUE

  override clip_on = $state(true)

  /** How long the attack envelope lasts. */
  duration: number

  
  params = {
    duration: "duration"
  }

  presets = PRESETS.attacks

  preset = $state(PRESETS.attacks.builtins[0])


  constructor(duration: Seconds)
  {
    super("ATTACK");
    this.duration = $state(duration);
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
