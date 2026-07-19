<!-- @component Overlay -->

<script lang="ts">

import { OverlayTab } from "#src/routes/tabs";

import Help from "./help.svelte";
import Changelog from "./changelog.svelte";

import { scale } from "svelte/transition";
import { expoOut, quartOut } from "svelte/easing";


interface Props {
  tab: OverlayTab | null;
}

let { tab = $bindable() }: Props = $props();

</script>


<svelte:window onkeydown={e => { if (e.key === "Escape") tab = null; }} />


{#if tab !== null}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="screen-protector" onclick={() => { tab = null; }}>
    <aside transition:scale={{ duration: 500, easing: expoOut, start: 0.97 }} onclick={e => e.stopPropagation()}>
      {#key tab}
        <div class="overlay-content" in:scale={{ duration: 500, easing: quartOut, start: 0.97 }}>

          {#if tab === OverlayTab.HELP}
            <Help />
          {:else if tab === OverlayTab.CHANGELOG}
            <Changelog />
          {/if}

        </div>

        <button onclick={() => { tab = null; }}>
          <div> × </div>
        </button>
      {/key}
    </aside>
  </div>
{/if}


<style lang="scss">

.screen-protector {
  width: 100vw;
  height: calc(100vh - 1.5rem);  // NOTE: Leave just enough space to keep access to navbar
  position: fixed;
  top: 1.5rem;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

aside {
  width: 80vw;
  height: 80vh;
  overflow-y: auto;
  scrollbar-color: $col-prot black;
  scrollbar-width: thin;
  background: rgb(#ccc, 4%);
  backdrop-filter: blur(16px);
  box-shadow: 0 0 24px black;

  button {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 1rem;
    right: 2rem;
    @include font-ui;
    color: white;
    font-size: 200%;
    line-height: 1;
    background: none;
    border: none;
    outline: none;

    &:hover, &:focus-visible {
      cursor: pointer;
      color: $col-prot;
      background: rgb(white, 5%);
    }

    &:active {
      color: $col-deut;
    }

    div {
      transform: translateY(-0.05em);
    }
  }
}

</style>
