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


const CANVAS_SCALE = 10;


let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;


onMount(() => {
  ctx = canvas.getContext("2d")!;

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

  const buffer_length = node.frequencyBinCount;
  let data = new Uint8Array(buffer_length);

  node.getByteFrequencyData(data);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = Colour.GREEN;

  for (let i = 0; i < data.length; i++)
  {
    let x_frac = i / data.length;
    let x = x_frac * canvas.width;

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


<canvas bind:this={canvas}></canvas>


<style lang="scss">

canvas {
  height: 50vh;
  width: 100%;
  // height: 40vh;
  image-rendering: pixelated;
}

</style>
