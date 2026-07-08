<script lang="ts">

import "#styles/essence.scss";

import { bind_keybinds } from "./keybinds";

import Overlay from "#parts/overlay.svelte";
import Keyboard from "#parts/keyboard.svelte";

import { onMount } from "svelte";


onMount(() => {
  bind_keybinds();
});

</script>


<Overlay />

<div class="root">
  <main></main>
  
  <div class="keyboard-container">
    <Keyboard octave={4} />
  </div>
</div>


<style lang="scss">

.root {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: stretch;
}

main {
  flex: 1;
  background: lightgrey;
}

.keyboard-container {
  flex: 0;
  background: #444;
}

</style>
