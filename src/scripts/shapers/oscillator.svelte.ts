import { Shaper, ShaperInstance } from "#scripts/types";

import * as PRESETS from "#scripts/const/presets";
import { SHAPER_SAMPLE_RES } from "#scripts/const/internal";
import type { int } from "#scripts/types";


export class OscillatorShaper
  extends Shaper<OscillatorShaper, OscillatorInstance>
{
  presets = PRESETS.waves

  preset = $state(PRESETS.waves.core[0])


  override create(ctx: AudioContext, freq: int): OscillatorInstance
  {
    return new OscillatorInstance(ctx, this, freq);
  }
}


export class OscillatorInstance
  extends ShaperInstance<OscillatorShaper, OscillatorInstance, AudioBufferSourceNode>
{
  freq: int;


  constructor(
    ctx: AudioContext,
    shaper: OscillatorShaper,
    freq: int,
  )
  {
    let node = new AudioBufferSourceNode(ctx);
    node.loop = true;

    super(ctx, node, shaper);
    this.freq = freq;

    this.update();
  }

  update()
  {
    const frame_count = Math.round(this.ctx.sampleRate / this.freq);

    let buffer = new AudioBuffer({
      numberOfChannels: 1,
      length: frame_count,
      sampleRate: this.ctx.sampleRate,
    });

    let channel = buffer.getChannelData(0);

    for (let i = 0; i < frame_count; i++) {
      let progress = this.freq * i / this.ctx.sampleRate;
      let idx = (progress * SHAPER_SAMPLE_RES) % SHAPER_SAMPLE_RES;

      channel[i] = this.shaper.amps[Math.floor(idx)];
    }

    this.node.buffer = buffer;
  }
}
