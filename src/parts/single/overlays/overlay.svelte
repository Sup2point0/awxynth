<!-- @component Overlay -->

<script lang="ts">

import { overlay_tab, OverlayTab } from "#scripts/stores";

import Help from "./HELP.md";
import Changelog from "./changelog.svelte";
import Credits from "./CREDITS.md";

import { scale } from "svelte/transition";
import { expoOut, quartOut } from "svelte/easing";

</script>


<svelte:window onkeydown={e => { if (e.key === "Escape") $overlay_tab = null; }} />


{#if $overlay_tab !== null}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="screen-protector" onclick={() => { $overlay_tab = null; }}>
    <aside transition:scale={{ duration: 500, easing: expoOut, start: 0.97 }} onclick={e => e.stopPropagation()}>
      {#key $overlay_tab}
        <div class="overlay-content" in:scale={{ duration: 500, easing: quartOut, start: 0.97 }}>

          {#if $overlay_tab === OverlayTab.HELP}
            <article><Help /></article>
          {:else if $overlay_tab === OverlayTab.CHANGELOG}
            <Changelog />
          {:else if $overlay_tab === OverlayTab.CREDITS}
            <article><Credits /></article>
          {/if}

        </div>

        <button onclick={() => { $overlay_tab = null; }}>
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

  .overlay-content {
    padding: 2rem 3rem;
  }

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
    @include interact($col-prot);

    div {
      transform: translateY(-0.05em);
    }
  }
}

</style>
