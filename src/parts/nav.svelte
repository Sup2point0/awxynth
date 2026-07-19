<!-- @component NavBar -->

<script lang="ts">

import { OverlayTab } from "../routes/tabs";


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
  </div>

  <div class="right">
    <button class="nav-clicky" onclick={open(OverlayTab.HELP)}>
      Help
    </button>

    <button class="nav-clicky" onclick={open(OverlayTab.CHANGELOG)}>
      Changelog
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
    transform: translateY(-0.1rem);
  }
}

.left {
  h1 {
    width: max-content;
    @include font-ui;
    color: transparent;
    font-size: 80%;
    font-weight: normal;
    background: linear-gradient(to right in oklch, $col-pink, $col-yellow);
    background-clip: text;
    -webkit-background-clip: textn;
  }
}

.right {
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  
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
