<script lang="ts">

import "#styles/essence.scss";

import { bind_keybinds } from "./keybinds";

import Overlay from "#parts/overlay.svelte";
import Keyboard from "#parts/keyboard.svelte";
import Envelope from "#parts/envelope.svelte";

import { onMount } from "svelte";


onMount(() => {
  bind_keybinds();
});

</script>


<Overlay />

<main>
  <div class="core">
    <div class="left"></div>

    <div class="right">
      <Envelope />
      <Envelope />
      <Envelope />
    </div>
  </div>
  
  <div class="lower">
    <Keyboard />
  </div>
</main>


<style lang="scss">

main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: stretch;
}

.core {
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
}

.left {
  flex: 1;
}

.right {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
}

.lower {
  flex: 0;
  background: #444;
}

</style>
