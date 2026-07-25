<!-- @component `ShaperChain`

A row in the synth containing 1 or more `<GraphEditor>`s.
-->

<script lang="ts">

import * as util from "#scripts/utils";
import type { ShaperChain } from "#scripts/synth";

import { GraphEditor } from "#parts";


interface Props
{
  /** The shaper chain this component manages. */
  chain: ShaperChain;
}

let { chain = $bindable() }: Props = $props();

</script>


<section
  class:disabled={chain.disabled}
>
  <div class="left">
    <h2 class="toggle"
      {@attach util.toggles(() => { chain.disabled = !chain.disabled; })}
      style:--colour={chain.colour}
    >
      {chain.title}
    </h2>
  </div>

  {#each chain.shapers as shaper, idx}
    <GraphEditor
      bind:shaper={chain.shapers[idx]}
      presets={shaper.presets}
      preset={shaper.preset}
    />
  {/each}
</section>


<style lang="scss">

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
    opacity: 40%;
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
