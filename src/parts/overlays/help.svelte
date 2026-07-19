<script>

import Content from "./HELP.md"

</script>


<div class="help">
  <Content />
</div>


<style lang="scss">

@use 'sass:color';


.help {
  :global(h2) {
    padding-bottom: 0.5em;
    margin: 2em 0 1em;
    @include font-ui;
    color: $col-prot;
    font-weight: normal;
    border-bottom: 1px solid rgb(white, 10%);
  }

  :global(p) {
    margin-bottom: 1em;
    @include font-body;
    color: white;
    font-size: 120%;
    font-weight: 150;
    line-height: 1.4;
  }

  :global(p strong) {
    color: $col-yellow;
    font-weight: 300;
  }

  :global(p strong em) {
    color: $col-pink;
    font-weight: 200;
    font-style: normal;
  }

  :global(span.math) {
    color: color.adjust($col-purp, $lightness: 10);
  }
}

</style>
