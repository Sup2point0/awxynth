<!-- @component `AddShaper`

An overlay window for selecting a new shaper to add to the chain.
-->

<script lang="ts">

import { SHAPER_CHAINS } from "#scripts/const";

import { AddShaperChain } from "#parts";

</script>


{#each Object.entries(SHAPER_CHAINS) as [category, shaper_chains]}
  <section>
    <h2> {category} </h2>

    {#each shaper_chains as shaper_chain}
      <AddShaperChain {shaper_chain} />
    {/each}
  </section>
{/each}


<style lang="scss">

section {
  padding-bottom: 3rem;
}

h2 {
  margin-bottom: 2rem;
  @include font-ui;
  color: $col-prot;
  font-size: 200%;
  font-weight: normal;
}

</style>
