<!-- @component GraphEditor

A generic graphing window for describing the shape of any parameter.
-->

<script lang="ts">

import * as util from "#scripts/utils";
import { INTERNAL } from "#scripts/const";
import type { Shaper, ShaperPreset } from "#scripts/types";

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

  /** The viewport bounds of this editor. */
  bounds?: {
    x?: [number, number];
    y?: [number, number];
  };

  /** (attribute) Should the viewport axes gridlines be relative to pi? */
  pi?: true;
}

let {
  shaper = $bindable(),
  presets = {},
  preset = { title: "Custom", latex: "" },
  bounds,
  pi,
}: Props = $props();

/** Window viewport bounds. */
let x_lower = $derived(bounds?.x?.at(0) ?? 0);
let x_upper = $derived(bounds?.x?.at(1) ?? 1);
let y_lower = $derived(bounds?.y?.at(0) ?? 0);
let y_upper = $derived(bounds?.y?.at(1) ?? 1);

// svelte-ignore state_referenced_locally
const presets_list = Object.values(presets).flat();

// svelte-ignore state_referenced_locally
let self = $state({
  latex: "",
  sampler_helper: null as any,
  ghost_enabled: false,
  preset_index: presets_list.indexOf(preset),
  is_focused: false,
  sync_interval: 0,
});

$effect(() => sync.focus_window(desmos_window, shaper.enabled && self.is_focused));


let el_editor: HTMLElement;
let el_window: HTMLElement;
let desmos_editor: Desmos.Calculator;
let desmos_window: Desmos.Calculator;

onMount(() => {
  desmos_window = setup.desmos_window(self, el_window, { x_lower, x_upper, y_lower, y_upper }, pi);
  desmos_editor = setup_desmos_editor(el_editor);
  setup_sampler_helper();

  sync.apply_preset(desmos_editor, preset);

  sync_all();
});


// == SETUP == //

function setup_desmos_editor(el_editor: HTMLElement): Desmos.Calculator
{
  let editor = Desmos.GraphingCalculator(el_editor, {
    invertedColors: true,
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

function setup_sampler_helper()
{
  let helper = self.sampler_helper;

  helper.observe("listValue", () => {
    if (helper.listValue == undefined) return;
    let data = helper.listValue;
    shaper.amps = shaper.clip_on ? util.clip(data) : data;
  });
  
  helper.observe("numericValue", () => {
    if (helper.numericValue == undefined) return;
    if (Number.isNaN(helper.numericValue)) return;

    let data = [helper.numericValue, helper.numericValue];
    shaper.amps = shaper.clip_on ? util.clip(data) : data;
  });
}


// == SYNC == //

function sync_all()
{
  sync.window_with_editor(self, shaper, desmos_window, desmos_editor);
  sync.focus_window(desmos_window, shaper.enabled && self.is_focused);
}

function start_active_syncing()
{
  self.sync_interval = setInterval(
    () => { console.log(`helper =`, self.sampler_helper); sync.window_with_editor(self, shaper, desmos_window, desmos_editor) },
    1000 / INTERNAL.FRAME_RATE
  );
}

function stop_active_syncing()
{
  clearInterval(self.sync_interval);
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
    sync.apply_preset(desmos_editor, preset);
    sync_all();
  };
}

function toggle_clip()
{
  shaper.clip_on = !shaper.clip_on;
  sync_all();
}

function toggle_ghost()
{
  self.ghost_enabled = !self.ghost_enabled;
  sync_all();
}

</script>


<div
  class="graph-editor"
  class:disabled={!shaper.enabled}
  class:focused={self.is_focused}
  onmouseenter={focus(true)} onfocuscapture={focus(true)}
  onmouseleave={focus(false)}
  style:--colour={shaper.colour}
  role="application"
>
  <div class="upper">
    <div class="left">
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <h3
        onclick={() => { shaper.enabled = !shaper.enabled }}
        onkeydown={e => {
          if (e.key === "Enter" || e.key === " ") {
            shaper.enabled = !shaper.enabled;
          }
        }}
      > {shaper.title} </h3>
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
      opacity: 0.5;

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

  .editor {
    flex: 1;
    min-width: 16em;

    &:focus-within {
      min-width: 24em;
    }
  }

  .window {
    flex: 2;
  }

  .disabled & {
    opacity: 0.4;
    filter: brightness(80%);
  }
}

</style>
