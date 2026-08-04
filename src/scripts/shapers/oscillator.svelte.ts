import * as PRESETS from "#scripts/const/presets";
import { prefs } from "#scripts/stores";
import type { GraphBounds, int } from "#scripts/types";
import { Shaper, ShaperInstance } from "#scripts/types";
import ltx from "#scripts/utils";

import { get } from "svelte/store";


export class OscillatorShaper
  extends Shaper<OscillatorShaper, OscillatorInstance>
{
  override bounds = {
    x: [0.0, ltx `2\pi`], x_pi: true,
    y: [-1.0, 1.0],
  } as GraphBounds
  
  override params = {
    mix: "level"
  }
  override presets = PRESETS.waves
  override preset = $state(PRESETS.waves.core[0])


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
    const RES = get(prefs).SHAPER_SAMPLE_RES;
    const frame_count = Math.round(this.ctx.sampleRate / this.freq);

    let buffer = new AudioBuffer({
      numberOfChannels: 1,
      length: frame_count,
      sampleRate: this.ctx.sampleRate,
    });

    let channel = buffer.getChannelData(0);

    for (let i = 0; i < frame_count; i++) {
      let progress = this.freq * i / this.ctx.sampleRate;
      let idx = (progress * RES) % RES;

      channel[i] = this.shaper.amps[Math.floor(idx)];
    }

    this.node.buffer = buffer;
  }
}
