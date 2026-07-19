<!-- @component GraphEditor

A generic graphing window for describing the shape of any parameter.
-->

<script lang="ts">

import { FUNC_SAMPLE_RES, Theme } from "#scripts/const";
import { Colour } from "#scripts/types";
import * as util from "#scripts/utils";
import type { int, Amplitude, Latex, ShaperPreset } from "#scripts/types";

import * as setup from "./setup";
import * as sync from "./sync";
import { Id, is_shaper } from "./expressions";

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
  latex_helper: null as any,
  preset_index: presets_list.indexOf(preset),
  is_focused: false,
});

$effect(() => sync.focus_window(desmos_window, self.is_focused));


let el_editor: HTMLElement;
let el_window: HTMLElement;
let desmos_editor: Desmos.Calculator;
let desmos_window: Desmos.Calculator;

onMount(() => {
  desmos_window = setup.desmos_window(el_window, { x_lower, x_upper, y_lower, y_upper }, pi);
  desmos_editor = setup_desmos_editor(el_editor);

  preset = presets_list[self.preset_index];
  sync.apply_preset(desmos_editor, preset);

  setup_sample_helper(desmos_editor);
  sync.window_with_editor(desmos_window, desmos_editor, colour);
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
    sync.window_with_editor(desmos_window, desmos_editor, colour);
  });
  
  return editor;
}

function setup_sample_helper(desmos_editor: Desmos.Calculator)
{
  const w = FUNC_SAMPLE_RES - 1;

  let helper = desmos_editor.HelperExpression({
    latex: `f(${x_lower} + ${x_upper - x_lower} * [0...${w}] / ${w-1})`
  });

  helper.observe("listValue", () => {
    if (helper.listValue == undefined) return;
    amps = helper.listValue;
  });
  helper.observe("numericValue", () => {
    if (helper.numericValue == undefined) return;
    amps = [helper.numericValue, helper.numericValue];
  });
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

    setup_sample_helper(desmos_editor);
    sync.window_with_editor(desmos_window, desmos_editor, colour);
  };
}

</script>


<div class="graph-editor"
  class:focused={self.is_focused}
  onmouseenter={focus(true)} onfocuscapture={focus(true)}
  onmouseleave={focus(false)}
  role="application"
>
  <div class="upper">
    <h3 style:color={colour}> {title} </h3>

    <div class="preset">
      <button class="left" onclick={cycle_presets("left")}> ‹ </button>
      <button class="title"> {preset.title} </button>
      <button class="right" onclick={cycle_presets("right")}> › </button>
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

  h3 {
    @include font-ui;
    font-size: 60%;
    font-weight: 300;
    transform: scaleX(120%);
    transform-origin: 0%;
  }

  .preset {
    display: flex;
    flex-flow: row nowrap;

    button {
      min-width: 3.5em;
      padding: 0.2rem 0;
      @include font-ui;
      color: white;
      background: none;
      border: none;
      outline: none;
      opacity: 8%;

      &.left, &.right {
        font-size: 50%;
        font-weight: 800;
      }

      &.title {
        font-size: 75%;
        transform: translateY(-0.05em);
      }

      .graph-editor.focused &:not(:where(:hover, :focus-visible)) {
        opacity: 40%;
      }

      &:where(:hover, :focus-visible) {
        cursor: pointer;
        opacity: 100%;
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
