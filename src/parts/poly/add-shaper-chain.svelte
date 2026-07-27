<!-- @component `AddShaperChain`

A clickable row for adding a new shaper chain to the synth.
-->

<script lang="ts">

import { synth } from "#scripts/synth";
import { nav_state } from "#scripts/stores";
import * as util from "#scripts/utils";
import { Theme } from "#scripts/const";
import type { Latex, ShaperChain } from "#scripts/types";

import { onMount } from "svelte";


interface Props {
  shaper_chain: ShaperChain;
}

let { shaper_chain: chain }: Props = $props();


let el_desmos: HTMLElement;
let desmos: Desmos.Calculator;

onMount(() =>
{
  if (typeof Desmos === "undefined") return;

  desmos = Desmos.GraphingCalculator(el_desmos, {
    border: false,
    invertedColors: true,
    expressions: false,
    settingsMenu: false,
    lockViewport: true,
    showGrid: false,
    xAxisNumbers: false, yAxisNumbers: false,
  });

  desmos.setMathBounds({
    left: 0, right: 1,
    bottom: 0, top: 1,
  });

  let latex = chain.desmos.latex;

  if (!Array.isArray(latex)) {
    desmos.setExpression(make_expr(latex));
  }
  else {
    for (let expr of latex) {
      desmos.setExpression(make_expr(expr));
    }
  }
});


function make_expr(latex: Latex): Desmos.ExpressionState
{
  return {
    latex,
    color: util.invert(chain.colour),
    fillOpacity: Theme.WAVE_OPACITY,
  };
}

function commit(shaper_chain: ShaperChain)
{
  return () => {
    let instance = shaper_chain.create_instance();
    synth.transforms.push(instance);
    $nav_state.overlay = null;
  };
}

</script>


<button onclick={commit(chain)}>
  <div class="left" bind:this={el_desmos}></div>

  <div class="right">
    <h3 style:color={chain.colour}> {chain.title} </h3>

    {#each chain.desc as block}
      <p> {@html block} </p>
    {/each}
  </div>
</button>


<style lang="scss">

button {
  width: 100%;
  height: max-content;
  padding: 1rem 2rem;
  display: flex;
  flex-flow: row nowrap;
  gap: 2rem;
  margin-bottom: 1rem;

  text-align: start;
  background: transparent;
  backdrop-filter: blur(8px);
  border: none;
  outline: none;

  &:hover , &:focus-visible {
    cursor: pointer;
    background: rgb(white, 1%);
  }

  &:active {
    filter: brightness(60%);
  }

  .left {
    width: 20rem;  // TEMP
    height: 10rem;  // TEMP
    max-width: 20rem;
    border: 1px solid rgb(white, 25%);
  }

  .right {
    h3 {
      margin-bottom: 1em;
      @include font-ui;
      font-size: 125%;
    }

    p {
      @include font-body;
      color: white;
    }
  }
}

</style>
