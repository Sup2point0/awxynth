import { Shaper, ShaperInstance } from "#scripts/types";

import * as PRESETS from "#scripts/const/presets";
import { Colour } from "#scripts/types";


export class DetuneShaper
  extends Shaper<DetuneShaper, DetuneInstance>
{
  override colour = Colour.PINK

  voices = $state(8)

  presets = PRESETS.detunes

  preset = $state(PRESETS.detunes.builtins[0])


  constructor()
  {
    super("DETUNE");
  }

  override create(ctx: AudioContext): DetuneInstance
  {
    return new DetuneInstance(ctx, this);
  }
}


export class DetuneInstance
  extends ShaperInstance<DetuneShaper, DetuneInstance, null>
{
  constructor(ctx: AudioContext, shaper: DetuneShaper)
  {
    super(ctx, null, shaper);
  }
}
