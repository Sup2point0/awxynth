<!-- @component `AddShaper`

An overlay window for selecting a new shaper to add to the chain.
-->

<script lang="ts">

import { synth, type ShaperChain } from "#scripts/synth";
import { nav_state } from "#scripts/stores";
import { SHAPER_CHAINS } from "#scripts/const";


function commit(shaper: () => ShaperChain)
{
  return () => {
    synth.transforms.push(shaper())
    $nav_state.overlay = null;
  };
}

</script>


{#each Object.entries(SHAPER_CHAINS) as [category, shapers]}
  <section>
    <h2> {category} </h2>

    {#each Object.entries(shapers) as [title, shaper]}
      <button onclick={commit(shaper)}>
        <div class="lower">
          {title}
        </div>
      </button>
    {/each}
  </section>
{/each}


<style lang="scss">



</style>
