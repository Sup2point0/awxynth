<!-- @component `Out`

-->

<script lang="ts">

import { Colour } from "#scripts/types";
import { INTERNAL } from "#scripts/const";

import { onMount } from "svelte";


interface Props {
  node: AnalyserNode;
}

let { node }: Props = $props();


const PEAK_FREQUENCY = Math.floor(INTERNAL.AUDIO_SAMPLE_RATE / 2);
const CANVAS_SCALE = 10;


let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;


onMount(() => {
  ctx = canvas.getContext("2d");

  setup_observer();
  render();
});


function setup_observer()
{
  let observer = new ResizeObserver(([container]) => {
    canvas.width = Math.ceil(container.borderBoxSize[0].inlineSize);
    canvas.height = Math.ceil(container.borderBoxSize[0].blockSize);
  });

  observer.observe(canvas);
}

function render()
{
  requestAnimationFrame(render);

  if (node == undefined) return;
  if (ctx == null) return;

  let data = new Uint8Array(PEAK_FREQUENCY);
  node.getByteFrequencyData(data);

  draw_lines(ctx, data);
}

function draw_lines(ctx: CanvasRenderingContext2D, data: Uint8Array)
{
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = Colour.GREEN;

  for (let i = 0; i < data.length; i++)
  {
    let x_frac = i / (data.length - 1);
    let freq = x_frac * PEAK_FREQUENCY;

    if (freq < INTERNAL.MIN_FREQUENCY) continue;
    if (freq > INTERNAL.MAX_FREQUENCY) continue;

    /* Scale logarithmically and normalise to [0.0, 1.0] */
    let x_frac_ln = (
      (Math.log(freq) - Math.log(INTERNAL.MIN_FREQUENCY))
      / (Math.log(INTERNAL.MAX_FREQUENCY) - Math.log(INTERNAL.MIN_FREQUENCY))
    );

    let x = x_frac_ln * canvas.width;
    // console.log(`x =`, x);

    let amplitude = data[i];
    let y_frac = amplitude / 255;
    let y = y_frac * canvas.height;

    ctx.fillRect(
      0.5 + x,
      canvas.height - y,
      1,
      y,
    );
  }
}

</script>


<canvas bind:this={canvas} onclick={render}></canvas>


<style lang="scss">

canvas {
  width: 100%;
  height: 40vh;
  image-rendering: pixelated;
}

</style>
