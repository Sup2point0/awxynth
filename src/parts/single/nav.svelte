<!-- @component NavBar -->

<script lang="ts">

import { synth } from "#scripts/synth";
import { nav_state, OverlayPage } from "#scripts/stores";

import { Meter } from "#parts";


function overlay(page: OverlayPage)
{
  return () => { $nav_state.overlay = page; };
}

</script>


<nav>
  <div class="left">
    <h1> <span>Awxynth</span> </h1>

    <Meter node={synth.analyser!} />
  </div>

  <div class="centre">
    <button class="nav-clicky" onclick={() => { $nav_state.out = !$nav_state.out; }}>
      <span>Output</span>
    </button>
  </div>

  <div class="right">
    <button class="nav-clicky" onclick={overlay(OverlayPage.HELP)}>
      <span>Help</span>
    </button>

    <button class="nav-clicky" onclick={overlay(OverlayPage.CHANGELOG)}>
      <span>Changelog</span>
    </button>

    <button class="nav-clicky" onclick={overlay(OverlayPage.CREDITS)}>
      <span>Credits</span>
    </button>

    <a class="nav-clicky" href="https://github.com/Sup2point0/awxynth" target="_blank">
      <span>GitHub</span>
    </a>
  </div>
</nav>


<style lang="scss">

nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  background: black;

  &:hover, &:focus-within {
    background: $col-hover;
  }

  > div {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
}

.left {
  gap: 1rem;

  h1 {
    width: max-content;
    padding: 0 1rem;
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

.centre {
  justify-content: center;
}

.right {
  transform: translateY(-0.1rem);
  justify-content: end;
}


.nav-clicky {
  padding: 0 0.5em;
  display: block;
  @include font-ui;
  color: white;
  font-size: 80%;
  text-decoration: none;
  background: none;
  border: none;
  outline: none;
  @include interact($col-prot);
}

span {
  display: block;
  transform: translateY(-0.1em);
}

</style>
