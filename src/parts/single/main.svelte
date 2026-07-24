<script lang="ts">

import { synth } from "#scripts/synth";
import { OscillatorShaper } from "#scripts/shapers";
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

    <Add action={() => synth.new_oscillator()} />
  </section>

  {#each synth.transforms as { title, colour, shapers }}
    <section>
      <div class="left">
        <h2 style:color={colour}> {title} </h2>
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
  justify-content: stretch;
  align-items: stretch;
  gap: 1rem;
  background: rgb(white, 2%);

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

.left {
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
    font-weight: 300;
    font-size: 100%;
    writing-mode: sideways-lr;
    text-align: center;
    opacity: 0.5;
  }

  :global(h3) {
    opacity: 0.5;
  }
}

</style>
