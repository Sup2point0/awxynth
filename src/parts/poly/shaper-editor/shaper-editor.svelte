<!-- @component `ShaperEditor`

A generic graphing window for describing the shape of any parameter.
-->

<script lang="ts">

import * as util from "#scripts/utils";
import type { Shaper, ShaperPreset, GraphBounds } from "#scripts/types";

import * as setup from "./setup";
import * as sync from "./sync";

import { onMount } from "svelte";


interface Props {
  /** The shaper this editor controls. */
  shaper: Shaper;

  /** Preset configurations for the user to start from, grouped by category. */
  presets?: Record<string, ShaperPreset[]>;

  /** The initial preset to use by default. */
  preset?: ShaperPreset;
}

let {
  shaper = $bindable(),
  presets = {},
  preset = { title: "Custom", latex: "" },
}: Props = $props();

// svelte-ignore state_referenced_locally
const presets_list = Object.values(presets).flat();


// svelte-ignore state_referenced_locally
let self = $state({
  latex: "",
  ghost_enabled: false,
  preset_index: presets_list.indexOf(preset),
  is_focused: false,
  sync_cancel: 0,
});


let el_editor: HTMLElement;
let el_window: HTMLElement;
let desmos_editor: Desmos.Calculator;
let desmos_window: Desmos.Calculator;

let no_desmos = $state(false);

onMount(() =>
{
  if (typeof Desmos === "undefined") {
    no_desmos = true;
    return;
  }

  desmos_window = setup.desmos_window(el_window, shaper.bounds);
  desmos_editor = setup_desmos_editor(el_editor);
  setup.sync_helpers(desmos_window, shaper);
  
  sync.apply_preset(desmos_editor, preset);
  sync.window_bounds(desmos_window, shaper);
  sync_discrete();
});

$effect(() => {
  sync.focus_window(desmos_window, shaper.enabled && self.is_focused)
});
$effect(() => {
  sync.window_bounds(desmos_window, shaper);
});


// == SETUP == //

function setup_desmos_editor(el_editor: HTMLElement): Desmos.Calculator
{
  let editor = Desmos.GraphingCalculator(el_editor, {
    invertedColors: true,
    border: false,
    graphpaper: false,
    expressions: true, expressionsTopbar: false,
    // @ts-ignore: outdated types
    audio: false,
  });

  // @ts-ignore: outdated types
  editor.observeEvent("change", (_, e) => {
    if (!e.isUserInitiated) return;
    sync.window_with_editor(self, shaper, desmos_window, desmos_editor);
  });
  
  return editor;
}


// == SYNC == //

// FIXME still need?
function sync_discrete()
{
  if (no_desmos) return;
  sync.window_with_editor(self, shaper, desmos_window, desmos_editor);
  sync.focus_window(desmos_window, shaper.enabled && self.is_focused);
}

function start_active_syncing()
{
  stop_active_syncing();

  function frame(): number {
    sync.window_with_editor(self, shaper, desmos_window, desmos_editor);
    return requestAnimationFrame(frame);
  }

  self.sync_cancel = frame();
}

function stop_active_syncing()
{
  cancelAnimationFrame(self.sync_cancel);
}


// == EVENT HANDLERS == //

function focus(is_focused: boolean)
{
  return () => { self.is_focused = is_focused; };
}

function cycle_presets(direction: "left" | "right")
{
  return () => {
    switch (direction) {
      case "left":
        self.preset_index--;
        if (self.preset_index < 0) {
          self.preset_index = presets_list.length - 1;
        }
        break;
      
      case "right":
        self.preset_index++;
        if (self.preset_index >= presets_list.length) {
          self.preset_index = 0;
        }
        break;
    }

    preset = presets_list[self.preset_index];

    if (no_desmos) return;
    sync.apply_preset(desmos_editor, preset);
    sync_discrete();
  };
}

function toggle_clip()
{
  shaper.clip_on = !shaper.clip_on;

  if (no_desmos) return;
  sync_discrete();
}

function toggle_ghost()
{
  self.ghost_enabled = !self.ghost_enabled;
  
  if (no_desmos) return;
  sync_discrete();
}

</script>


<div
  class="graph-editor"
  class:disabled={!shaper.enabled}
  class:focused={self.is_focused}
  onmouseenter={focus(true)} onfocuscapture={focus(true)}
  onmouseleave={focus(false)}
  style:--colour={shaper.colour}
  style:--colour-inverted={util.invert(shaper.colour)}
  role="application"
>
  <div class="upper">
    <div class="left">
      <h3
        {@attach util.toggles(() => { shaper.enabled = !shaper.enabled; })}
      >
        {shaper.title}
      </h3>
    </div>

    <div class="preset">
      <button class="prev" onclick={cycle_presets("left")}> <div>‹</div> </button>
      <button class="title"> {preset.title} </button>
      <button class="next" onclick={cycle_presets("right")}> <div>›</div> </button>
    </div>

    <div class="right">
      <button class="clip"
        class:enabled={shaper.clip_on}
        onclick={toggle_clip}
      >
        {#if shaper.clip_on} <div class="tick">✓</div> {/if} <div>CLIP</div>
      </button>
      
      {#if shaper.clip_on}
        <button class="ghost"
          class:enabled={self.ghost_enabled}
          onclick={toggle_ghost}
        >
          {#if self.ghost_enabled} <div class="tick">✓</div> {/if} <div>SHOW RAW</div>
        </button>
      {/if}
    </div>
  </div>

  <div class="embeds">
    {#if no_desmos}
      <p> Uh oh, failed to load Desmos embeds! Try checking your internet connection and reloading the page? </p>
    
    {:else}
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="editor"
        bind:this={el_editor}
        onmousedown={start_active_syncing}
        onmouseup={stop_active_syncing}>
      </div>

      <div class="window"
        bind:this={el_window}>
      </div>
    
    {/if}
  </div>
</div>


<style lang="scss">

.graph-editor {
  flex: 1;
  min-width: 40rem;
  min-height: 20rem;
  display: flex;
  flex-flow: column nowrap;
}

.upper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  > * {
    flex: 1;
  }

  h3 {
    user-select: none;
    @include font-ui;
    color: var(--colour, $col-prot);
    font-size: 60%;
    font-weight: 300;
    transform: scaleX(110%);
    transform-origin: 0%;

    &:hover, &:focus-visible {
      cursor: pointer;
      color: white;
    }

    &:active {
      color: $col-deut;
    }

    .disabled &:not(:where(:hover, :focus-visible, :active)) {
      color: rgb(white, 40%);
    }
  }

  .preset {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    button {
      min-width: 3em;
      padding: 0.25rem 0;
      @include font-ui;
      color: white;
      background: none;
      border: none;
      outline: none;
      opacity: 8%;

      &.title {
        min-width: 8em;
        padding: 0 0.5em;
        font-size: 75%;
        transform: translateY(-0.05em);
      }

      &.prev, &.next {
        user-select: none;
        font-size: 50%;
        font-weight: 800;
      }

      &.prev div { transform: translateX(-0.15em); }
      &.next div { transform: translateX(0.15em); }

      .graph-editor.focused &:not(:where(:hover, :focus-visible, :active)) {
        opacity: 40%;
      }

      &:hover, &:focus-visible, &:active {
        cursor: pointer;
        opacity: 100%;
        background: $col-hover;
      }

      &:active {
        color: $col-prot;
      }
    }
  }

  .right {
    display: flex;
    flex-flow: row-reverse nowrap;
    justify-content: end;
    gap: 1rem;

    button {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 0.5em;
      @include font-ui;
      color: white;
      font-size: 70%;
      background: none;
      border: none;
      outline: none;
      opacity: 50%;

      &:hover {
        cursor: pointer;
        color: var(--colour);
        opacity: 1;
      }

      &:active {
        color: $col-deut;
      }

      &.enabled {
        color: var(--colour);
        opacity: 1;

        &:hover, &:focus-visible {
          color: white;
        }

        &:active {
          color: $col-deut;
        }
      }

      .tick {
        @include font-code;
        font-size: 100%;
        transform: scale(150%);
      }
    }
  }
}

.embeds {
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  position: relative;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    @include font-body;
    color: $col-red;
    text-align: center;
    transform: translateX(-50%) translateY(-50%);
  }

  .editor {
    flex: 1;
    min-width: 16em;

    &:focus-within {
      min-width: max(50%, 24em);
    }
  }

  .window {
    flex: 2;
  }

  .disabled & {
    opacity: 30%;
    filter: brightness(80%);
  }
}

</style>
