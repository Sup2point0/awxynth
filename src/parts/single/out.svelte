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


let el_canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;

onMount(() => {
  ctx = el_canvas.getContext("2d");
  ctx?.scale(2, 2);

  update();
});


function update()
{
  requestAnimationFrame(update);

  if (node == undefined) return;
  if (ctx == null) return;

  const buffer_length = node.frequencyBinCount;
  let data = new Uint8Array(buffer_length);

  node.getByteFrequencyData(data);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 300, 100);

  ctx.fillStyle = Colour.GREEN;

  for (let i = 0; i < data.length; i++) {
    let amplitude = data[i];

    ctx.fillRect(
      0.5 + 1*i,
      50 - 0.1 * amplitude,
      0.5,
      0.1 * amplitude
    );
  }
}

</script>


<canvas
  bind:this={el_canvas}
  width="400px"
  height="300px"
></canvas>


<style lang="scss">

canvas {
  width: 100%;
  height: 40vh;
  image-rendering: pixelated;
}

</style>
