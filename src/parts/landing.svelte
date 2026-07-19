<!-- @component LandingOverlay -->

<script lang="ts">

import { synth } from "#scripts/synth";
import { awxynth } from "#scripts/suppety";

import { onMount } from "svelte";
import { blur } from "svelte/transition";


let open = $state(true);
let tip = $state();


onMount(() => {
  tip = awxynth?.tips?.sample_value();
});


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
    out:blur={{ duration: 1000 }}
  >
    <h1>
      <div style:--i={1}>A</div>
      <div style:--i={2}>w</div>
      <div style:--i={3}>x</div>
      <div style:--i={4}>y</div>
      <div style:--i={5}>n</div>
      <div style:--i={6}>t</div>
      <div style:--i={7}>h</div>
    </h1>
    
    {#if tip}
      <small in:blur={{ duration: 500 }}>
        {@html tip}
      </small>
    {/if}

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
  gap: 2rem;
  background: black;
}

h1 {
  position: absolute;
  top: 50vh;
  display: flex;
  flex-flow: row nowrap;
  @include font-ui;
  font-size: 800%;
  font-weight: normal;
  color: transparent;
  background: linear-gradient(to right in oklch, $col-pink, $col-yellow);
  background-clip: text;
  -webkit-background-clip: text;
  transform: translateY(-100%);

  > div {
    animation: 2s cubic-bezier(0.19, 1, 0.22, 1) swoop-in;  // ease-out-exp
    animation-delay: calc(var(--i, 1) * 0.2s);
    animation-fill-mode: backwards;

    @keyframes swoop-in {
      from { color: red; transform: translateX(-50vw); }
      to   { color: transparent; transform: translateX(0); }
    }
  }
}

small {
  position: absolute;
  top: 50vh;
  @include font-body;
  color: $col-prot;
  font-size: 125%;
  font-weight: 150;
  transform: translateY(100%);

  :global(code) {
    @include font-code;
    font-size: 90%;
  }
}

p {
  position: absolute;
  bottom: 25vh;
  @include font-ui;
  font-size: 150%;
  font-weight: 100;
  color: white;
  transform: translateY(10vh);
  animation: 2.0s infinite alternate ease-in-out flash;
  animation-delay: 4.0s;
  animation-fill-mode: backwards;

  &:hover {
    color: $col-prot;
  }

  aside:active & {
    color: $col-deut;
  }

  @keyframes flash {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}

</style>
