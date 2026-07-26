<!-- @component `Docss` -->

<script lang="ts">

import { nav_state, Docs } from "#scripts/stores";

import {
  Quickstart,
  FAQ,
  Troubleshooting,
  Glossary,
} from "#docs";


let open_page = $derived($nav_state.docs_page);

</script>


<nav>
  {#each Object.values(Docs) as page}
    {#if page.startsWith("Group:")}
      <h3> {page.replace("Group:", "")} </h3>
    {:else}
      <button
        class:open={open_page === page}
        onclick={() => { $nav_state.docs_page = page; }}
      >
        {page}
      </button>
    {/if}
  {/each}
</nav>

<article class={open_page.toLowerCase()}>
  {#if      open_page === Docs.FAQ}             <FAQ />
  {:else if open_page === Docs.TROUBLESHOOTING} <Troubleshooting />
  {:else if open_page === Docs.GLOSSARY}        <Glossary />

  {:else}
    <Quickstart />
  
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

  &.faq, &.troubleshooting {
    :global(h3) {
      margin: 2.5em 0 0.5em;
      @include font-body;
      color: $col-trit;
      font-weight: normal;
    }
  }
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
