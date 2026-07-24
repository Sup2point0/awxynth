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
      <div style:--i={7}>A</div>
      <div style:--i={6}>w</div>
      <div style:--i={5}>x</div>
      <div style:--i={4}>y</div>
      <div style:--i={3}>n</div>
      <div style:--i={2}>t</div>
      <div style:--i={1}>h</div>
    </h1>
    
    {#if tip}
      <small in:blur={{ duration: 1000, delay: 200 }}>
        {@html tip}
      </small>
    {/if}

    <p> click to start </p>
  </aside>
{/if}


<style lang="scss">

aside {
  user-select: none;
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
  transform: translateY(-100%);

  > div {
    background: linear-gradient(to right in oklch,
      color-mix(in oklch, $col-yellow, $col-pink calc(100% * (var(--i, 1) - 1) / 7)),
      color-mix(in oklch, $col-yellow, $col-pink calc(100% * (var(--i, 1) - 0) / 7)));
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    animation: 1.0s cubic-bezier(0.19, 1, 0.22, 1) swoop-in;  // ease-out-exp
    animation-delay: calc(var(--i, 1) * 0.06s);
    animation-fill-mode: backwards;

    @keyframes swoop-in {
      from { transform: translateX(-5rem); opacity: 0; }
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
  animation-delay: 2.0s;
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
