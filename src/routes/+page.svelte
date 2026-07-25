<script lang="ts">

import "#styles/essence.scss";
import "#styles/article.scss";

import { synth } from "#scripts/synth";
import { onkeydown, onkeyup } from "./keybinds";

import {
  Landing, Overlay,
  Nav, Main, Out, Keyboard,
} from "#parts";

</script>


<svelte:window
  {onkeydown}
  {onkeyup}
  onblur={() => synth.stop_all()}
/>


<Landing />

<div class="root">
  <Nav />
  <Overlay />
  <Main />
  <Out node={synth.analyser} />
  
  <div class="keyboard-container">
    <Keyboard />
  </div>
</div>


<style lang="scss">

.root {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 0.1rem;
  background: rgb(black, 94%);
}

.keyboard-container {
  flex: 0;
  background: black;
}

</style>
