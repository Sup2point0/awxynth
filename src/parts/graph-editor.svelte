<!-- @component GraphEditor
 
A generic graphing window for describing the shape of any parameter.
-->

<script lang="ts">

import type { latex } from "#scripts/types";

import { onMount } from "svelte";


interface Props {
  value: latex;
  bounds?: {
    x?: { lower?: number; upper?: number };
    y?: { lower?: number; upper?: number };
  };
}

let {
  value = $bindable(),
  bounds,
}: Props = $props();


let el_window: HTMLElement;
let el_prompt: HTMLElement;
let el_formula: HTMLElement;

let desmos: unknown;

onMount(() =>
{
  desmos = Desmos.GraphingCalculator(el_window, {
    expressions: false,
    settingsMenu: false, lockViewport: true,
    showGrid: true, graphPaper: false,
    xAxisNumbers: false, yAxisNumbers: true,
    xAxisStep: 0.5, yAxisStep: 0.5,
  });

  desmos.setMathBounds({
    left:   bounds?.x?.lower ?? 0,
    right:  bounds?.x?.upper ?? 1,
    bottom: bounds?.y?.lower ?? 0,
    top:    bounds?.y?.upper ?? 1,
  });

  let MQ = MathQuill.getInterface(2);

  MQ.StaticMath(el_prompt);

  let field = MQ.MathField(el_formula, {
    handlers: {
      edit: () => {
        value = field.latex();
      }
    }
  });

  (window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches }) => {
      if (matches) {
        desmos.updateSettings({ invertedColors: true });
      } else {
        desmos.updateSettings({ invertedColors: false });
      }
    })
  );
});

$effect(() => {
  value;

  if (desmos) {
    desmos.setExpression({ id: "ft", latex: value });
  }
});

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
