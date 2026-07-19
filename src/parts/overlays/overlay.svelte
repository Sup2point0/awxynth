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
  <aside transition:scale={{ duration: 500, easing: expoOut, start: 0.97 }}>
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
{/if}


<style lang="scss">

aside {
  width: 80vw;
  height: 80vh;
  position: fixed;
  left: 10vw;
  top: 10vh;
  z-index: 10;
  background: rgb(#ccc, 4%);
  backdrop-filter: blur(16px);
  box-shadow: 0 0 24px black;

  .overlay-content {
    height: 100%;
    overflow-y: auto;
    scrollbar-color: $col-prot black;
    scrollbar-width: thin;
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

    &:hover {
      background: rgb(white, 5%);
    }

    div {
      transform: translateY(-0.05em);
    }
  }
}

</style>
