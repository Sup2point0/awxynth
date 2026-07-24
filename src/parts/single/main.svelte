<script lang="ts">

import { synth } from "#scripts/synth";
import { PRESETS } from "#scripts/const";
import { Colour } from "#scripts/types";

import {
  Add,
  GraphEditor,
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

  {#each synth.transforms as { title, colour, disabled, shapers }}
    <section class:disabled>
      <div class="left">
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <h2 class="toggle"
          onclick={() => { disabled = !disabled; }}
          onkeydown={e => { if (e.key === "Enter" || e.key === " ") disabled = !disabled; }}
          style:--colour={colour}
        > {title} </h2>
      </div>

      {#each shapers as shaper, idx}
        <GraphEditor
          bind:shaper={shapers[idx]}
          presets={shaper.presets}
          preset={shaper.preset}
        />
      {/each}
    </section>
  {/each}

  <section style:margin-top="1rem">
    <Add action={() => { }} />
  </section>
</main>


<style lang="scss">

main {
  flex: 1;
  overflow-y: auto;
}

section {
  flex: 1;
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
