<script lang="ts">

import { onMount } from "svelte";


let ctx: AudioContext;


onMount(() => {
  let real = new Float32Array(4096);
  let imag = new Float32Array(4096);

  for (let x = 1; x < 4096; x += 2) {
    imag[x] = 4.0 / (Math.PI * x);
  }

  ctx = new AudioContext();
  let wavetable = ctx.createPeriodicWave(real, imag);
  let osc = ctx.createOscillator();
  osc.setPeriodicWave(wavetable);
  osc.connect(ctx.destination);
  osc.start(0);
});

</script>


<button onclick={() => ctx.resume()}>
  Play
</button>
