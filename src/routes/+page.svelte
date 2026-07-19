<script lang="ts">

import "#styles/essence.scss";

import { synth } from "#scripts/synth";
import { PRESETS } from "#scripts/const";
import { Colour } from "#scripts/types";

import { bind_keybinds } from "./keybinds";
import { OverlayTab } from "./tabs";

import {
  Add,
  GraphEditor,
  Keyboard,
  Nav,
  Landing,
} from "#parts";

import { onMount } from "svelte";


onMount(() => {
  return bind_keybinds();
});

</script>


<svelte:window onblur={() => synth.stop_all()} />


<Landing />

<div class="root">
  <Nav bind:tab />
  <Overlay bind:tab />

  <main>
    <section>
      <h2> OSCILLATORS </h2>

      <GraphEditor title="OSCILLATOR 1" pi
        bind:amps={synth.osc1_amps}
        presets={PRESETS.waves}
        preset={PRESETS.waves.core[0]}
        bounds={{ x: [0, 2*Math.PI], y: [-1.05, 1.05] }}
      />

      <Add />
    </section>

    <section>
      <h2> ENVELOPE </h2>

      <GraphEditor title="ATTACK" colour={Colour.BLUE}
        bind:amps={synth.attack_amps}
        presets={PRESETS.attacks}
        preset={PRESETS.attacks.builtins[0]}  // linear
      />
      <GraphEditor title="RELEASE" colour={Colour.PURPLE}
        bind:amps={synth.release_amps}
        presets={PRESETS.releases}
        preset={PRESETS.releases.builtins[1]} // exponential
      />

      <Add />
    </section>
  </main>
  
  <div class="keyboard-container">
    <Keyboard />
  </div>
</div>


<style lang="scss">

$gap-vert: 0.5rem;
$gap-horiz: 1rem;


.root {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: $gap-vert;
  background: rgb(black, 95%);
}

main {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  gap: $gap-vert;
}

section {
  flex: 1;
  padding-bottom: 0.25rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  gap: $gap-horiz;
  background: rgb(white, 2%);

  h2 {
    @include font-ui;
    color: $col-prot;
    font-weight: 300;
    writing-mode: sideways-lr;
    text-align: center;
    opacity: 0.5;
  }

  :global(h3) {
    opacity: 0.5;
  }

  &:where(:hover, :focus-within) {
    background: rgb(white, 4%);

    h2 {
      opacity: 1;
    }

    :global(h3) {
      opacity: 1;
    }
  }
}

.keyboard-container {
  flex: 0;
  background: black;
}

</style>
