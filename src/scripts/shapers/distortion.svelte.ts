import { Shaper, ShaperInstance } from "#scripts/types";

import * as PRESETS from "#scripts/const/presets";
import { Colour, type Seconds } from "#scripts/types";


export class DistortionShaper
  extends Shaper<DistortionShaper, DistortionInstance>
{
  override colour = Colour.RED

  override clip_on = $state(true)

  presets = PRESETS.distortions

  preset = $state(PRESETS.distortions.builtins[0])


  constructor()
  {
    super("DISTORTION");
  }


  override create(ctx: AudioContext): DistortionInstance
  {
    return new DistortionInstance(ctx, this);
  }
}


export class DistortionInstance
  extends ShaperInstance<DistortionShaper, DistortionInstance, WaveShaperNode>
{
  constructor(ctx: AudioContext, shaper: DistortionShaper)
  {
    super(ctx, new WaveShaperNode(ctx), shaper);
    this.update();
  }


  update()
  {
    this.node.curve = new Float32Array(this.shaper.amps);
  }
}
