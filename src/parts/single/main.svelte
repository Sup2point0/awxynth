<script lang="ts">

import { synth } from "#scripts/synth";
import { nav_state, OverlayPage } from "#scripts/stores";
import { PRESETS } from "#scripts/const";
import { Colour } from "#scripts/types";

import {
  Add,
  GraphEditor,
  ShaperChain,
} from "#parts";

</script>

<main>
  <section>
    <div class="left">
      <h2 style:color={Colour.GREEN}> OSCILLATORS </h2>
    </div>

    {#each synth.oscillators.keys() as idx}
      <GraphEditor pi
        bind:shaper={synth.oscillators[idx]}
        presets={PRESETS.waves}
        preset={PRESETS.waves.core[idx]}
        bounds={{ x: [0, 2*Math.PI], y: [-1.05, 1.05] }}
      />
    {/each}

    <div class="right">
      <Add action={() => synth.new_oscillator()} />
    </div>
  </section>

  {#each synth.transforms as chain}
    <ShaperChain bind:chain />
  {/each}

  <div style:margin-top="1rem">
    <Add action={() => { $nav_state.overlay = OverlayPage.ADD_SHAPER; }} />
  </div>
</main>


<style lang="scss">

main {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: $col-prot black;
}

// FIXME extract
section {
  overflow-x: auto;
  scrollbar-width: none;
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  background: rgb(white, 2%);

  &:where(:hover, :focus-within) {
    background: rgb(white, 4%);
  }

  &.disabled {
    opacity: 0.5;
  }
}

.left {
  margin-right: -0.5rem;
  position: sticky;
  left: 0;
  z-index: 5;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  background: rgb(black, 40%);
  backdrop-filter: blur(8px);

  h2 {
    user-select: none;
    margin: 0;
    @include font-ui;
    color: var(--colour, $col-prot);
    font-weight: 300;
    font-size: 100%;
    writing-mode: sideways-lr;
    text-align: center;

    &.toggle:where(:hover, :focus-visible) {
      cursor: pointer;
      color: white;
    }

    .disabled & {
      color: rgb(white, 50%);

      &:hover, &:focus-visible {
        color: var(--colour, $col-prot);
      }
    }

    &.toggle:active {
      filter: brightness(60%);
    }
  }

  &:hover {
    background: $col-hover;
  }
}

.right {
  position: sticky;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(black, 40%);
  backdrop-filter: blur(8px);
}

</style>
