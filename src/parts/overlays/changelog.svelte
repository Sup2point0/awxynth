<script>

import Content from "../../../CHANGELOG.md";

</script>


<div class="changelog">
  <Content />
</div>


<style lang="scss">

@use 'sass:color';


.changelog {
  padding: 2rem 3rem;
  overflow-y: auto;

  :global(.changelog-layout) {
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 1em;
    row-gap: 1em;
  }

  :global(h1) {
    @include font-ui;
    color: white;
    font-weight: 100;
  }

  :global(h2) {
    grid-column-start: 1;
    grid-column-end: 3;
    padding: 2em 0 0.5em;
    margin-bottom: 0.25em;
    @include font-ui;
    color: white;
    font-size: 1.25em;
    font-weight: normal;
    border-bottom: 1px solid rgb(white, 10%);
  }

  :global(p) {
    display: block;
    @include font-ui;
    color: white;
  }

  :global(h3) {
    padding-top: 0.5em;
    display: block;
    @include font-ui;
    font-size: 0.8em;
    font-weight: normal;
    text-transform: uppercase;
  }

  // change
  :global(h3:not(:has(em)) strong) {
    padding: 0.2em 0.5em;
    font-weight: normal;
    color: $col-yellow;
    background: color.change($col-yellow, $alpha: 15%);
  }

  // feature
  :global(h3 strong em) {
    padding: 0.2em 0.5em;
    font-weight: normal;
    color: $col-green;
    background: color.change($col-green, $alpha: 15%);
  }

  // fix
  :global(h3 em) {
    padding: 0.2em 0.5em;
    font-style: normal;
    color: $col-purp;
    background: color.change($col-purp, $alpha: 15%);
  }

  :global(h3:has(em):not(:has(strong)) + p) {
    color: rgb(white, 60%);
  }

  :global(p > strong) {
    font-weight: normal;
    color: $col-purp;
  }
}

</style>
