import { Shaper, ShaperInstance } from "#scripts/types";

import * as PRESETS from "#scripts/const/presets";
import { SHAPER_SAMPLE_RES, AUDIO_SAMPLE_RATE } from "#scripts/const/internal";
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
    const frame_count = Math.round(AUDIO_SAMPLE_RATE / this.freq);

    let buffer = new AudioBuffer({
      numberOfChannels: 1,
      length: frame_count,
      sampleRate: AUDIO_SAMPLE_RATE,
    });

    let channel = buffer.getChannelData(0);

    for (let i = 0; i < frame_count; i++) {
      let progress = this.freq * i / AUDIO_SAMPLE_RATE;
      let idx = (progress * SHAPER_SAMPLE_RES) % SHAPER_SAMPLE_RES;

      channel[i] = this.shaper.amps[Math.floor(idx)];
    }

    this.node.buffer = buffer;
  }
}
