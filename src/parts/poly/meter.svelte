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
  let animation_frame = sample_level();
  return () => cancelAnimationFrame(animation_frame);
});


function sample_level(): number
{
  if (node == undefined) return 0;
  
  let data = new Float32Array(2048);
  node.getFloatTimeDomainData(data);

  let total = data.reduce((sum, x) => sum + Math.abs(x), 0);
  let mean = total / data.length;

  level = mean ** 0.5;

  return requestAnimationFrame(sample_level);
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
