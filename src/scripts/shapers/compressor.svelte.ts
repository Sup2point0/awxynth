import { Shaper, ShaperInstance } from "#scripts/types";
import type { Amplitude } from "#scripts/types";

import * as PRESETS from "#scripts/const/presets";
import { Colour } from "#scripts/types";


export class CompressorShaper
  extends Shaper<CompressorShaper, CompressorInstance>
{
  override colour = Colour.BLUE

  override clip_on = $state(true)

  // FIXME
  threshold: Amplitude = $state(0)

  presets = PRESETS.distortions

  preset = $state(PRESETS.distortions.builtins[0])


  constructor()
  {
    super("COMPRESSOR");
  }

  override create(ctx: AudioContext): CompressorInstance
  {
    return new CompressorInstance(ctx, this);
  }
}


export class CompressorInstance
  extends ShaperInstance<CompressorShaper, CompressorInstance, WaveShaperNode>
{
  constructor(ctx: AudioContext, shaper: CompressorShaper)
  {
    super(ctx, new WaveShaperNode(ctx), shaper);
    this.node.oversample = "2x";
    this.update();
  }


  update()
  {
    this.node.curve = new Float32Array([
        ...this.shaper.amps.slice(1).toReversed().map(a => -a),
        ...this.shaper.amps
    ]);
  }
}
