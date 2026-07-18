<!-- @component GraphEditor

A generic graphing window for describing the shape of any parameter.
-->

<script lang="ts">

import { FUNC_SAMPLE_RES, Theme, Colour } from "#scripts/const";
import type { int, Amplitude, Latex } from "#scripts/types";

import { onMount } from "svelte";


interface Props {
  /** The LaTeX source this editor controls. */
  latex: Latex;

  /** The amplitude-over-time data this editor's function emits. */
  amps: Amplitude[];

  /** The viewport bounds of this editor. */
  bounds?: {
    x?: { lower?: number; upper?: number };
    y?: { lower?: number; upper?: number };
  };
}

let {
  latex = $bindable(),
  amps = $bindable(),
  bounds,
}: Props = $props();

// window viewport bounds
let x_lower = $derived(bounds?.x?.lower ?? 0);
let x_upper = $derived(bounds?.x?.upper ?? 1);
let y_lower = $derived(bounds?.y?.lower ?? 0);
let y_upper = $derived(bounds?.y?.upper ?? 1);


let el_editor: HTMLElement; let desmos_editor: Desmos.Calculator;
let el_window: HTMLElement; let desmos_window: Desmos.Calculator;

/** Helper expression for sampling the user's curve. */
let formula_helper: any;

enum Id {
  SHAPER        = "shaper",
  SHAPER_RENDER = "shaper-render",
  SHAPER_FILL   = "shaper-fill",
}


let is_focused = $state(false);

$effect(() => {
  is_focused;

  desmos_window?.updateSettings({
    xAxisNumbers: is_focused, yAxisNumbers: is_focused,
  });

  desmos_window?.setExpression({
    id: Id.SHAPER_FILL,
    fillOpacity: (is_focused ? 1.5 : 1) * Theme.WAVE_OPACITY
  });
});


onMount(() => {
  setup_desmos_window();
  setup_desmos_editor();
  sync_with_editor();
});


/* NOTE: Does not initialise any expressions, those are left for `sync_with_editor()` to avoid duplication */
function setup_desmos_window()
{
  desmos_window = Desmos.GraphingCalculator(el_window, {
    invertedColors: true,
    expressions: false,
    showGrid: true,
    xAxisNumbers: false, yAxisNumbers: false,
    xAxisStep: Math.PI / 2, yAxisStep: 1,
    settingsMenu: true,
    lockViewport: true,
  });

  desmos_window.setMathBounds({
    left:   x_lower, right: x_upper,
    bottom: y_lower, top:   y_upper,
  });
}

function setup_desmos_editor()
{
  desmos_editor = Desmos.GraphingCalculator(el_editor, {
    invertedColors: true,
    graphpaper: false,
    expressions: true, expressionsTopbar: false,
    audio: false,
  });

  let w = FUNC_SAMPLE_RES - 1;

  desmos_editor.setExpression({
    id: Id.SHAPER,
    latex,
  });
  
  formula_helper = desmos_editor.HelperExpression({
    latex: `f(${x_lower} + ${x_upper - x_lower} * [0...${w}] / ${w-1})`
  });

  desmos_editor.observeEvent("change", (_, e) => {
    if (!e.isUserInitiated) return;
    sync_all();
  });
}

function sync_with_editor()
{
  let shaper_latex = desmos_editor.getExpressions().find(expr => expr.id === Id.SHAPER)?.latex;
  if (shaper_latex == undefined) return;

  latex = shaper_latex;

  desmos_window.setExpression({
    id: Id.SHAPER_RENDER,
    latex: shaper_latex,
    color: Colour.GREEN_INV,
  });
  desmos_window.setExpression({
    id: Id.SHAPER_FILL,
    latex: String.raw `\min(f(x), 0) \le y \le \max(f(x), 0)`,
    color: Colour.GREEN_INV,
    lines: false,
    fillOpacity: Theme.WAVE_OPACITY,
  });
}

function try_sample_desmos(tries: int = 0)
{
  if (tries > 3) return;

  setTimeout(() => {
    if (formula_helper?.listValue) {
      amps = formula_helper.listValue;
    } else {
      try_sample_desmos(tries + 1);
    }
  }, 200);
}

function sync_all()
{
  sync_with_editor();
  try_sample_desmos();
}

</script>


<div class="graph-editor"
  onmouseenter={() => { is_focused = true; }}
  onmouseleave={() => { is_focused = false; }}
  role="application"
>
  <div class="editor" bind:this={el_editor}></div>
  <div class="window" bind:this={el_window}></div>
</div>


<style lang="scss">

.graph-editor {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  background: #444;
}

.editor {
  flex: 1;
}

.window {
  flex: 2;
}

.formula {
  flex: 0;
  height: 4em;
  min-height: 4em;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  background-color: light-dark(white, black);
  border: 1px solid grey;

  .input {
    width: 100%;
    color: light-dark(black, white);
    border: none;
    outline: none;
    box-shadow: none;
  }
}

</style>
