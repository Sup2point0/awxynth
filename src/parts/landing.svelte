<!-- @component LandingOverlay -->

<script lang="ts">

import { synth } from "#scripts/synth";

import { blur } from "svelte/transition";


let open = $state(true);


function close()
{
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
    <h1> Awxynth </h1>
    <p> click to start </p>
  </aside>
{/if}


<style lang="scss">

aside {
  cursor: pointer;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  background: black;
}

h1 {
  @include font-ui;
  font-size: 500%;
  font-weight: normal;
  color: transparent;
  background: linear-gradient(to right in oklch, $col-pink, $col-yellow);
  background-clip: text;
  -webkit-background-clip: text;
}

p {
  @include font-fun;
  font-size: 150%;
  font-weight: 100;
  color: white;
  animation: 2.0s infinite alternate ease-in-out flash;

  aside:active & {
    color: $col-prot;
  }

  @keyframes flash {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}

</style>
