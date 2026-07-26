<!-- @component `Out`

-->

<script lang="ts">

import { Colour } from "#scripts/types";
import * as util from "#scripts/utils";
import { INTERNAL } from "#scripts/const";

import { onMount } from "svelte";


interface Props {
  node: AnalyserNode;
}

let { node }: Props = $props();


const CANVAS_RESOLUTION = 4;
const SIDE_MARGIN = 10 * CANVAS_RESOLUTION;
const LOWER_HEIGHT = 10 * CANVAS_RESOLUTION;


let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;

let spectrum_width = 0;
let spectrum_height = 0;


onMount(() => {
  ctx = canvas.getContext("2d");

  setup_observer();
  /* Manually trigger sync to initialise canvas */
  canvas.dispatchEvent(new Event("resize"));

  let cancel = render();
  return () => cancelAnimationFrame(cancel);
});


function setup_observer()
{
  let observer = new ResizeObserver(([container]) => {
    canvas.width = Math.ceil(container.borderBoxSize[0].inlineSize) * CANVAS_RESOLUTION;
    canvas.height = Math.ceil(container.borderBoxSize[0].blockSize) * CANVAS_RESOLUTION;
    spectrum_width = canvas.width - 2 * SIDE_MARGIN;
    spectrum_height = canvas.height - LOWER_HEIGHT;
  });

  observer.observe(canvas);
}

function render(): number
{
  let cancel = requestAnimationFrame(render);

  if (node == undefined) return 0;
  if (ctx == null) return 0;

  let data = new Uint8Array(node.frequencyBinCount);
  node.getByteFrequencyData(data);

  draw_lines(ctx, data);

  return cancel;
}

function draw_lines(ctx: CanvasRenderingContext2D, data: Uint8Array)
{
  const PEAK_FREQUENCY = Math.floor(node.context.sampleRate / 2);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgb(128 128 128 / 10%)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // lines
  ctx.strokeStyle = "rgb(255 255 255 / 10%)";
  ctx.lineWidth = 1 * CANVAS_RESOLUTION;

  // text
  let size = 8 * CANVAS_RESOLUTION;
  ctx.font = `${size}px 'Orbit'`;
  ctx.fillStyle = "rgb(255 255 255)";

  for (let p = 1; p < 5; p++) {
    let order = 10 ** p;

    for (let i = 2; i <= 10; i++) {
      let freq = i * order;
      if (freq > INTERNAL.MAX_FREQUENCY) break;

      let x_frac_ln = log_freq_normalised(freq);
      let x = x_frac_ln * spectrum_width + SIDE_MARGIN;
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, spectrum_height);
      ctx.stroke();

      let freq_text = String(freq).replace(/000$/, "k");
      x -= 2 * freq_text.length * CANVAS_RESOLUTION;
      let y = spectrum_height + size;
      ctx.fillText(freq_text, x, y);
    }
  }

  let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0.0, Colour.PURPLE + "ff");
  gradient.addColorStop(0.5, Colour.PINK + "80");
  gradient.addColorStop(1.0, Colour.YELLOW.replace(")", " / 10%)"));
  ctx.strokeStyle = gradient;

  for (let i = 0; i < data.length; i++)
  {
    let x_frac = i / (data.length - 1);
    let freq = x_frac * PEAK_FREQUENCY;

    if (freq < INTERNAL.MIN_FREQUENCY) continue;
    if (freq > INTERNAL.MAX_FREQUENCY) continue;

    let x_frac_ln = log_freq_normalised(freq);
    let x = x_frac_ln * spectrum_width + SIDE_MARGIN;

    let amplitude = data[i];
    let y_frac = amplitude / 255;
    let y = y_frac * (spectrum_height - 10);

    ctx.lineWidth = CANVAS_RESOLUTION + 2 * (1 - x_frac_ln);
    ctx.beginPath();
    ctx.moveTo(x + 0.5, spectrum_height - y);
    ctx.lineTo(x + 0.5, spectrum_height);
    ctx.stroke();
  }
}

/**
 * Scale `freq` logarithmically and normalise to `[0.0, 1.0]`.
 */
function log_freq_normalised(freq: number): number
{
  let delta = Math.log(freq) - Math.log(INTERNAL.MIN_FREQUENCY);
  let total = Math.log(INTERNAL.MAX_FREQUENCY) - Math.log(INTERNAL.MIN_FREQUENCY);
  return delta / total;
}

</script>


<canvas bind:this={canvas} onclick={render}></canvas>


<style lang="scss">

canvas {
  width: 100%;
  height: 40vh;
  position: absolute;
  bottom: 0;
  z-index: 10;
  background: transparent;
  backdrop-filter: blur(8px);
}

</style>
