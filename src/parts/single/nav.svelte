<!-- @component NavBar -->

<script lang="ts">

import { synth } from "#scripts/synth";
import { OverlayTab } from "#src/routes/tabs";

import { Meter } from "#parts";


interface Props {
  tab: OverlayTab | null;
}

let { tab = $bindable() }: Props = $props();


function open($tab: OverlayTab)
{
  return () => { tab = $tab; };
}

</script>


<nav>
  <div class="left">
    <h1> Awxynth </h1>

    <Meter node={synth.analyser!} />
  </div>

  <div class="right">
    <button class="nav-clicky" onclick={open(OverlayTab.HELP)}>
      Help
    </button>

    <button class="nav-clicky" onclick={open(OverlayTab.CHANGELOG)}>
      Changelog
    </button>

    <button class="nav-clicky" onclick={open(OverlayTab.CREDITS)}>
      Credits
    </button>

    <a class="nav-clicky" href="https://github.com/Sup2point0/awxynth" target="_blank">
      GitHub
    </a>
  </div>
</nav>


<style lang="scss">

nav {
  padding: 0 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  background: black;

  &:hover, &:focus-within {
    background: rgb(white, 8%);
  }

  > div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 1rem;
  }
}

.left {
  h1 {
    width: max-content;
    padding-right: 1rem;
    @include font-ui;
    color: transparent;
    font-size: 80%;
    font-weight: normal;
    background: linear-gradient(to right in oklch, $col-pink, $col-yellow);
    background-clip: text;
    -webkit-background-clip: text;
    border-right: 1px solid rgb(white, 15%);
  }
}

.right {
  transform: translateY(-0.1rem);

  .nav-clicky {
    display: block;
    @include font-ui;
    color: white;
    font-size: 80%;
    text-decoration: none;
    background: none;
    border: none;
    outline: none;

    &:hover, &:focus-visible {
      cursor: pointer;
      color: $col-prot;
    }

    &:active {
      color: $col-deut;
    }
  }
}

</style>
