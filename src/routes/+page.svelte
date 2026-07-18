<script lang="ts">

import "#styles/essence.scss";

import { synth } from "#scripts/synth";

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


<Overlay />

<main>
  <div class="core">
    <div class="side">
      <GraphEditor
        bind:latex={synth.wave_latex}
        bind:amps={synth.wave_amps}
        bounds={{ x: { upper: 2 * Math.PI }, y: { lower: -1.0 }}}
      />

      <GraphEditor
        bind:latex={synth.env_latex}
        bind:amps={synth.env_amps}
      />
    </div>

    <div class="side">
      <GraphEditor
        bind:latex={synth.env_latex}
        bind:amps={synth.env_amps}
      />
      <GraphEditor
        bind:latex={synth.wave_latex}
        bind:amps={synth.wave_amps}
        bounds={{ x: { upper: 2 * Math.PI }, y: { lower: -1.0 }}}
      />

    </div>
  </div>
  
  <div class="lower">
    <Keyboard />
  </div>
</main>


<style lang="scss">

$flex-gap: 0.4rem;

main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: stretch;
  gap: $flex-gap;
}

.core {
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  gap: $flex-gap;
}

.side {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  gap: $flex-gap;
}

.lower {
  flex: 0;
  background: #444;
}

</style>
