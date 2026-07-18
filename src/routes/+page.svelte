<script lang="ts">

import "#styles/essence.scss";

import { synth } from "#scripts/synth";
import { Colour } from "#scripts/const";

import { bind_keybinds } from "./keybinds";

import {
  GraphEditor,
  Keyboard,
  Overlay,
} from "#parts";

import { onMount } from "svelte";


onMount(() => {
  return bind_keybinds();
});

</script>


<svelte:window onblur={() => synth.stop_all()} />


<Overlay />

<div class="root">
  <main>
    <section>
      <h2> OSCILLATORS </h2>

      <GraphEditor title="OSCILLATOR 1" pi
        bind:latex={synth.osc1_latex}
        bind:amps={synth.osc1_amps}
        bounds={{ x: [0, 2*Math.PI], y: [-1.05, 1.05] }}
      />
      <GraphEditor title="OSCILLATOR 2" pi
        bind:latex={synth.osc1_latex}
        bind:amps={synth.osc1_amps}
        bounds={{ x: [0, 2*Math.PI], y: [-1.05, 1.05] }}
      />
    </section>

    <section>
      <h2> ENVELOPE </h2>

      <GraphEditor title="ATTACK" colour={Colour.BLUE}
        bind:latex={synth.attack_latex}
        bind:amps={synth.attack_amps}
      />
      <GraphEditor title="RELEASE" colour={Colour.PURPLE}
        bind:latex={synth.release_latex}
        bind:amps={synth.release_amps}
      />
    </section>
  </main>
  
  <div class="keyboard-container">
    <Keyboard />
  </div>
</div>


<style lang="scss">

$flex-gap: 0.5rem;

.root {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: $flex-gap;
  background: rgb(black, 95%);
}

main {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  gap: $flex-gap;
}

section {
  flex: 1;
  max-height: 16rem;
  padding: 0.25rem 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  gap: $flex-gap;
  background: rgb(white, 2%);

  h2 {
    @include font-ui;
    color: $col-prot;
    font-weight: 300;
    writing-mode: sideways-lr;
    text-align: center;
    opacity: 0.5;
  }

  &:where(:hover, :focus-within) {
    background: rgb(white, 4%);

    h2 {
      opacity: 1;
    }
  }
}

.keyboard-container {
  flex: 0;
  background: black;
}

</style>
