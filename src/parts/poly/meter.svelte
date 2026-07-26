<!-- @component Meter -->

<script lang="ts">

import { INTERNAL } from "#scripts/const";

import { onMount } from "svelte";


interface Props {
  node: AnalyserNode;
}

let { node }: Props = $props();


let level = $state(0);


onMount(() => {
  let cancel = sample_level();
  return () => cancelAnimationFrame(cancel);
});


function sample_level(): number
{
  let cancel = requestAnimationFrame(sample_level);

  if (node == undefined) return 0;
  
  let data = new Float32Array(node.fftSize);
  node.getFloatTimeDomainData(data);

  let total = data.reduce((sum, x) => sum + x * x, 0);
  let mean = total / data.length;
  let rms = mean ** 0.5;
  level = rms;

  return cancel;
}

</script>


<div class="meter">
  <div class="juice" style:--level={level}></div>
</div>


<style lang="scss">

$meter-width: 16rem;

.meter {
  width: $meter-width;
  height: 0.6rem;
  background: rgb(white, 10%);
}

.juice {
  width: calc(100% * var(--level, 0));
  max-width: $meter-width;
  height: 100%;
  background: linear-gradient(to right in oklch, $col-yellow, $col-pink);
  background-size: $meter-width;
}

</style>
