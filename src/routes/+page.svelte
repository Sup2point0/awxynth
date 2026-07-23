<script lang="ts">

import "#styles/essence.scss";
import "#styles/article.scss";

import { synth } from "#scripts/synth";

import { bind_keybinds } from "./keybinds";
import { OverlayTab } from "./tabs";

import { Landing, Nav, Overlay, Main, Keyboard } from "#parts";

import { onMount } from "svelte";


let tab: OverlayTab | null = $state(null);

onMount(() => {
  return bind_keybinds();
});

</script>


<svelte:window onblur={() => synth.stop_all()} />


<Landing />

<div class="root">
  <Nav bind:tab />
  <Overlay bind:tab />
  <Main />
  
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
  gap: 1rem;
  background: rgb(black, 95%);
}

.keyboard-container {
  flex: 0;
  background: black;
}

</style>
