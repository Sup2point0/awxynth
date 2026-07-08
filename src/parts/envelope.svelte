<!-- @component env

-->

<script lang="ts">

import { synth } from "#scripts/synth";
import { DEFAULTS } from "#scripts/const";

import { onMount } from "svelte";


let el_window: HTMLElement;
let el_formula: HTMLElement;

let desmos: unknown;

onMount(() =>
{
  // let config = {
//   expressions: controls, expressionsCollapsed: true,
//   graphPaper: false, showGrid: controls,
//   keypad: false, settingsMenu: controls,
//   lockViewport: !controls, zoomButtons: controls,
//   showXAxis: controls, showYAxis: controls,
//   xAxisNumbers: controls, yAxisNumbers: controls,
// };
  desmos = Desmos.GraphingCalculator(el_window, {
    expressions: false,
    settingsMenu: true, lockViewport: true,
    showGrid: true, graphPaper: false,
    xAxisNumbers: false, yAxisNumbers: true,
    xAxisStep: 0.5,
  });

  desmos.setMathBounds({
    left: 0, right: 1,
    bottom: 0, top: 1,
  });

  let MQ = MathQuill.getInterface(2);
  let field = MQ.MathField(el_formula, {
    handlers: {
      edit: () => {
        synth.env = field.latex();
      }
    }
  });
});

$effect(() => {
  synth.env;

  if (desmos) {
    desmos.setExpression({ id: "env", latex: synth.env });
  }
});

</script>


<div class="env-editor">
  <div class="env-window" bind:this={el_window}></div>
  <div class="env-formula" bind:this={el_formula}></div>
</div>


<style lang="scss">

.env-editor {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  background: #444;
}

.env-window {
  flex: 1;
  min-height: 20vh;
}

.env-formula {
  flex: 0;
  height: 8em;
  background-color: white;
  border: 1px solid grey;
}

</style>
