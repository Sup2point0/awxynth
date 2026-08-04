<!-- @component `Docss` -->

<script lang="ts">

import { nav_state } from "#scripts/stores";
import { Docs, type DocsPageData } from "#scripts/const";

import { InjectDesmos } from "#parts/poly";


let [open_page, Page]: DocsPageData = $derived($nav_state.docs_page);

</script>


<nav>
  {#each Object.values(Docs) as category}
    {#if category.title}
      <h3> {category.title} </h3>
    {/if}

    {#each Object.entries(category.pages) as [page, Page]}
      <button
        class:open={open_page === page}
        onclick={() => { $nav_state.docs_page = [page, Page]; }}
      >
        {page}
      </button>
    {/each}
  {/each}
</nav>

<article class={open_page.toLowerCase().replaceAll(" ", "-")}>
  {#if Page}
    {#key open_page}
      <InjectDesmos>
        <Page />
      </InjectDesmos>
    {/key}
  {/if}
</article>


<style lang="scss">

$nav-width: 18rem;


nav {
  width: max-content;
  display: flex;
  flex-flow: column nowrap;
  float: left;
  position: sticky;
  top: 2rem;

  h3 {
    padding: 4em 0 1.5em 1em;
    @include font-ui;
    color: rgb(white, 50%);
    font-size: 75%;
    font-weight: normal;
  }

  button {
    padding: 0.4em 1em;
    @include font-ui;
    color: white;
    font-size: 90%;
    text-align: left;
    background: none;
    border: none;
    outline: none;
    @include interact($col-prot);

    &.open {
      pointer-events: none;
      color: $col-deut;
    }
  }
}

article {
  padding-left: $nav-width;
}

:global(.glossary-layout) {
  display: grid;
  grid-template-columns: min-content 1fr;
  column-gap: 2rem;
  row-gap: 2rem;

  :global(h3) {
    min-width: max-content;
    @include font-ui;
    color: $col-orange;
    font-weight: 300;
    font-size: 100%;
  }

  :global(h3 em) {
    font-style: normal;

    &::after {
      content: '(Awxynth)';
      margin-top: 0.5em;
      display: block;
      @include font-body;
      color: rgb(white, 20%);
      font-size: 80%;
    }
  }

  :global(p) {
    margin-bottom: 0.5em;
  }
}

</style>
