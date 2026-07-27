<!-- @component `AddShaper`

An overlay window for selecting a new shaper to add to the chain.
-->

<script lang="ts">

import { synth } from "#scripts/synth";
import { nav_state } from "#scripts/stores";
import { SHAPER_CHAINS } from "#scripts/const";
import type { ShaperChain } from "#scripts/types";


function commit(shaper_chain: ShaperChain)
{
  return () => {
    let instance = shaper_chain.create_instance();
    synth.transforms.push(instance);
    $nav_state.overlay = null;
  };
}

</script>


{#each Object.entries(SHAPER_CHAINS) as [category, shaper_chains]}
  <section>
    <h2> {category} </h2>

    {#each shaper_chains as chain}
      <button onclick={commit(chain)}>
        <div class="left"></div>

        <div class="right">
          <h3 style:color={chain.colour}> {chain.title} </h3>

          {#each chain.desc as block}
            <p> {@html block} </p>
          {/each}
        </div>
      </button>
    {/each}
  </section>
{/each}


<style lang="scss">

h2 {
  margin-bottom: 3rem;
  @include font-ui;
  color: $col-prot;
  font-size: 200%;
  font-weight: normal;
}

button {
  width: 100%;
  height: max-content;
  padding: 1rem 2rem;
  display: flex;
  flex-flow: row nowrap;
  gap: 2rem;
  margin-bottom: 1rem;

  text-align: start;
  background: transparent;
  backdrop-filter: blur(8px);
  border: none;
  outline: none;

  &:hover , &:focus-visible {
    cursor: pointer;
    background: rgb(white, 1%);
  }

  &:active {
    filter: brightness(60%);
  }

  .left {
    width: 20rem;  // TEMP
    height: 10rem;  // TEMP
    max-width: 20rem;
    border: 1px solid rgb(white, 25%);
  }

  .right {
    h3 {
      margin-bottom: 1em;
      @include font-ui;
      font-size: 125%;
    }

    p {
      @include font-body;
      color: white;
    }
  }
}

</style>
