<script lang="ts">

import { synth } from "#scripts/synth";

import { onMount } from "svelte";
import { blur } from "svelte/transition";


let open = $state(true);

onMount(() => {
  setTimeout(close, 1000);
});


function close() {
  open = false;
  synth.init();
}

</script>


{#if open}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <aside
    class="overlay init"
    onclick={close}
    onkeydown={close}
    transition:blur={{ duration: 1000 }}
  >
    <h1> awxynth </h1>
  </aside>
{/if}


<style lang="scss">

aside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right in oklch, #ff0090, #9090f1);
}

h1 {
  @include font-fun;
  font-size: 250%;
  color: white;
}

</style>
