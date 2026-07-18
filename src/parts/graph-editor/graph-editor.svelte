<!-- @component GraphEditor

A generic graphing window for describing the shape of any parameter.
-->

<script lang="ts">

import { FUNC_SAMPLE_RES, Theme, Colour } from "#scripts/const";
import * as util from "#scripts/utils";
import type { int, Amplitude, Latex } from "#scripts/types";

import * as setup from "./setup";
import * as sync from "./sync";
import { Id, is_shaper } from "./expressions";

import { onMount } from "svelte";


interface Props {
  title?: string;

  /** Colour of the title text. */
  colour?: string;

  /** The LaTeX source this editor controls. */
  latex: Latex;

  /** The amplitude-over-time data this editor's function emits. */
  amps: Amplitude[];

  /** The viewport bounds of this editor. */
  bounds?: {
    x?: [number, number];
    y?: [number, number];
  };

  pi?: any;
}

let {
  title = "SHAPER",
  colour = Colour.GREEN,
  latex = $bindable(),
  amps = $bindable(),
  bounds,
  pi,
}: Props = $props();

// window viewport bounds
let x_lower = $derived(bounds?.x?.at(0) ?? 0);
let x_upper = $derived(bounds?.x?.at(1) ?? 1);
let y_lower = $derived(bounds?.y?.at(0) ?? 0);
let y_upper = $derived(bounds?.y?.at(1) ?? 1);


let el_editor: HTMLElement; let desmos_editor: Desmos.Calculator;
let el_window: HTMLElement; let desmos_window: Desmos.Calculator;

/** Helper expression for sampling the user's curve. */
let formula_helper: any;


let is_focused = $state(false);

$effect(() => {
  sync.focus_window(desmos_window, is_focused);
});


onMount(() => {
  desmos_window = setup.desmos_window(el_window, { x_lower, x_upper, y_lower, y_upper }, pi);
  setup_desmos_editor();
  sync_all();
});


function setup_desmos_editor()
{
  desmos_editor = Desmos.GraphingCalculator(el_editor, {
    invertedColors: true,
    graphpaper: false,
    expressions: true, expressionsTopbar: false,
    audio: false,
  });
  desmos_editor.setExpression({
    id: Id.SHAPER,
    latex,
  });
  // @ts-ignore: outdated types
  desmos_editor.observeEvent("change", (_, e) => {
    if (!e.isUserInitiated) return;
    sync_all();
  });
  
  let w = FUNC_SAMPLE_RES - 1;

  formula_helper = desmos_editor.HelperExpression({
    latex: `f(${x_lower} + ${x_upper - x_lower} * [0...${w}] / ${w-1})`
  });
}

function sync_with_editor()
{
  let expressions = desmos_editor.getExpressions();
  if (expressions == undefined) {
    console.error(`awxynth: Failed to fetch desmos expressions`);
    return;
  }

  let shaper_latex = expressions.find(expr => is_shaper(expr))?.latex;
  if (shaper_latex == undefined) return;

  latex = shaper_latex;

  desmos_window.setExpression({
    id: Id.SHAPER_RENDER,
    latex: shaper_latex,
    color: util.invert(colour),
  });
  desmos_window.setExpression({
    id: Id.SHAPER_FILL,
    latex: String.raw `\min(f(x), 0) \le y \le \max(f(x), 0)`,
    color: util.invert(colour),
    lines: false,
    fillOpacity: Theme.WAVE_OPACITY,
  });
}

function try_sample_desmos(tries: int = 0)
{
  if (tries > 3) return;

  if (formula_helper?.listValue) {
    amps = formula_helper.listValue;
  }
  else if (formula_helper?.numericValue) {
    amps = [formula_helper.numericValue, formula_helper.numericValue];
  }
  else {
    setTimeout(() => try_sample_desmos(tries + 1), 200);
  }
}

function sync_all()
{
  sync_with_editor();
  try_sample_desmos();
}

</script>


<div class="graph-editor"
  onmouseenter={() => { is_focused = true; }} onfocuscapture={() => { is_focused = true; }}
  onmouseleave={() => { is_focused = false; }}
  role="application"
>
  <h3 style:color={colour}> {title} </h3>

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

h3 {
  @include font-ui;
  font-size: 60%;
  font-weight: 300;
  transform: scaleX(120%);
  transform-origin: 0%;
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
