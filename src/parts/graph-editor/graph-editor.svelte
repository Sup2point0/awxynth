<!-- @component GraphEditor

A generic graphing window for describing the shape of any parameter.
-->

<script lang="ts">

import { Colour } from "#scripts/types";
import * as util from "#scripts/utils";
import type { int, Amplitude, Latex, ShaperPreset } from "#scripts/types";

import * as setup from "./setup";
import * as sync from "./sync";

import { onMount } from "svelte";


interface Props {
  title?: string;

  /** Colour of the title text. */
  colour?: string;

  /** The amplitude-over-time data this editor's function emits. */
  amps: Amplitude[];

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
  title = "SHAPER",
  colour = Colour.GREEN,
  amps = $bindable(),
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
  clip_enabled: false,
  ghost_enabled: false,
  preset_index: presets_list.indexOf(preset),
  is_focused: false,
});

$effect(() => sync.focus_window(desmos_window, self.is_focused));


let el_editor: HTMLElement;
let el_window: HTMLElement;
let desmos_editor: Desmos.Calculator;
let desmos_window: Desmos.Calculator;

onMount(() => {
  desmos_window = setup.desmos_window(self, el_window, { x_lower, x_upper, y_lower, y_upper }, pi);
  desmos_editor = setup_desmos_editor(el_editor);
  setup_sampler_helper();

  preset = presets_list[self.preset_index];
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
    sync.window_with_editor(self, desmos_window, desmos_editor, colour);
  });
  
  return editor;
}

function setup_sampler_helper()
{
  let helper = self.sampler_helper;

  helper.observe("listValue", () => {
    if (helper.listValue == undefined) return;
    let data = helper.listValue;
    amps = self.clip_enabled ? util.clip(data) : data;
  });
  helper.observe("numericValue", () => {
    if (helper.numericValue == undefined) return;
    let data = [helper.numericValue, helper.numericValue];
    amps = self.clip_enabled ? util.clip(data) : data;
  });
}


// == SYNC == //

function sync_all()
{
  sync.window_with_editor(self, desmos_window, desmos_editor, colour);
  sync.focus_window(desmos_window, self.is_focused);
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
  self.clip_enabled = !self.clip_enabled;
  sync_all();
}

function toggle_ghost()
{
  self.ghost_enabled = !self.ghost_enabled;
  sync_all();
}

</script>


<div class="graph-editor"
  class:focused={self.is_focused}
  onmouseenter={focus(true)} onfocuscapture={focus(true)}
  onmouseleave={focus(false)}
  style:--colour={colour}
  role="application"
>
  <div class="upper">
    <div class="left">
      <h3 style:color={colour}> {title} </h3>
    </div>

    <div class="preset">
      <button class="prev" onclick={cycle_presets("left")}> <div>‹</div> </button>
      <button class="title"> {preset.title} </button>
      <button class="next" onclick={cycle_presets("right")}> <div>›</div> </button>
    </div>

    <div class="right">
      <button class="clip"
        class:enabled={self.clip_enabled}
        onclick={toggle_clip}
      >
        {#if self.clip_enabled} <div class="tick">✓</div> {/if} <div>CLIP</div>
      </button>
      
      {#if self.clip_enabled}
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
    <div class="editor" bind:this={el_editor}></div>
    <div class="window" bind:this={el_window}></div>
  </div>
</div>


<style lang="scss">

.graph-editor {
  flex: 1;
  height: 100%;
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
    @include font-ui;
    font-size: 60%;
    font-weight: 300;
    transform: scaleX(110%);
    transform-origin: 0%;
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
        background: rgb(white, 5%);
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
  }

  .window {
    flex: 2;
  }
}

</style>
