<!-- @component `Out`

-->

<script lang="ts">

import * as util from "#scripts/utils";
import ltx from "#scripts/utils";
import { INTERNAL } from "#scripts/const";

import { onMount } from "svelte";


interface Props {
  node: AnalyserNode;
}

let { node }: Props = $props();


let el_spectrum: HTMLElement;
let desmos_spectrum: Desmos.Calculator;

onMount(() => {
  setup_spectrum();

  let update_interval = setInterval(sample_spectrum, 10000 / INTERNAL.FRAME_RATE);

  return () => clearTimeout(update_interval);
});


function setup_spectrum()
{
  desmos_spectrum = Desmos.GraphingCalculator(el_spectrum, {
    invertedColors: true,
    expressions: false,
    settingsMenu: false,
    // @ts-ignore outdated types
    xAxisScale: "logarithmic",
    lockViewport: true,
  });

  desmos_spectrum.setMathBounds({
    left: 20, right: 20_000,
    bottom: -1, top: 11,
  });
}

function sample_spectrum()
{
  if (node == undefined) return;

  let data = new Uint8Array(Math.floor(INTERNAL.AUDIO_SAMPLE_RATE / 2));
  node.getByteFrequencyData(data);

  let data_reduced = util.downsample(data, INTERNAL.FREQUENCY_DOWNSAMPLE);

  desmos_spectrum.setExpression({
    id: "data",
    latex: ltx `D = [${data_reduced.join(",")}]`,
  });

  desmos_spectrum.setExpression({
    id: "spectrum",
    latex: ltx `x = ${INTERNAL.FREQUENCY_DOWNSAMPLE} D \{ 0 \le y \le D \}`,
  });
}

</script>


<section onmousedown={sample_spectrum}>
  <div class="spectrum" bind:this={el_spectrum}></div>
</section>


<style lang="scss">

section {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
}

.spectrum {
  flex: 1;
  min-height: 20rem;
}

</style>
