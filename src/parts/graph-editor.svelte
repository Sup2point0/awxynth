<!-- @component GraphEditor
 
A generic graphing window for describing the shape of any parameter.
-->

<script module lang="ts">

declare let Desmos: any;
declare let MathQuill: any;

</script>


<script lang="ts">

import { FUNC_SAMPLE_RES } from "#scripts/const";
import type { int, Amplitude, Latex } from "#scripts/types";

import { onMount, untrack } from "svelte";


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

let x_lower = $derived(bounds?.x?.lower ?? 0);
let x_upper = $derived(bounds?.x?.upper ?? 1);
let y_lower = $derived(bounds?.y?.lower ?? 0);
let y_upper = $derived(bounds?.y?.upper ?? 1);


let el_window: HTMLElement;
let el_prompt: HTMLElement;
let el_formula: HTMLElement;

let desmos: any;
let formula_helper: any;


onMount(() => {
  setup_desmos();
  setup_mathquill();
  update_desmos();
});

$effect(() => {
  latex;
  untrack(update_desmos);
});


function setup_desmos()
{
  desmos = Desmos.GraphingCalculator(el_window, {
    expressions: true,
    settingsMenu: false, lockViewport: true,
    showGrid: true, graphPaper: false,
    xAxisNumbers: true, yAxisNumbers: true,
    xAxisStep: Math.PI / 2, yAxisStep: 1,
  });

  desmos.setMathBounds({
    left:   x_lower, right: x_upper,
    bottom: y_lower, top:   y_upper,
  });

  let w = FUNC_SAMPLE_RES - 1;
  
  formula_helper = desmos.HelperExpression({
    latex: `f(${x_lower} + ${x_upper - x_lower} * [0...${w}] / ${w-1})`
  });
  
  window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches }) => {
      if (matches) {
        desmos.updateSettings({ invertedColors: true });
      } else {
        desmos.updateSettings({ invertedColors: false });
      }
    })
  ;
}

function update_desmos()
{
  if (desmos == undefined) return;
  
  desmos.setExpression({ id: "ft", latex: `f(t) = ${latex}` });
  try_sample_desmos(0);
}

function try_sample_desmos(tries: int)
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

function setup_mathquill()
{
  let MQ = MathQuill.getInterface(2);

  MQ.StaticMath(el_prompt);

  let field = MQ.MathField(el_formula, {
    handlers: {
      edit: () => {
        latex = field.latex();
      }
    }
  });

  field.latex(latex);
}

</script>


<div class="graph-editor">
  <div class="window" bind:this={el_window}></div>
  <div class="formula">
    <div class="prompt" bind:this={el_prompt}>f\left( t \right) =</div>
    <div class="input" bind:this={el_formula}></div>
  </div>
</div>


<style lang="scss">

.graph-editor {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  background: #444;
}

.window {
  flex: 1;
  min-height: 20vh;
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
