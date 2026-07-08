<script lang="ts">

import { onMount } from "svelte";


let ctx: AudioContext;
let osc: OscillatorNode;

let freq = $state(440);


onMount(() => {
  let real = new Float32Array(4096);
  let imag = new Float32Array(4096);

  for (let x = 1; x < 4096; x += 2) {
    imag[x] = 4.0 / (Math.PI * x);
  }

  ctx = new AudioContext();
  let wavetable = ctx.createPeriodicWave(real, imag);
  osc = ctx.createOscillator();
  osc.setPeriodicWave(wavetable);
  osc.connect(ctx.destination);
  osc.start(0);
});

$effect(() => {
  freq;
  if (osc) osc.frequency.value = freq;
});

</script>


<button onclick={() => ctx.resume()}>
  Play
</button>

<input type="range" bind:value={freq} />
