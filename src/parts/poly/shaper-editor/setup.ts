import { INTERNAL } from "#scripts/const";

import * as util from "#scripts/utils";
import{ ltx } from "#scripts/utils";
import type { Shaper, GraphBounds } from "#scripts/types";

import { Func, Id } from "./expressions";


/**
 * Initialise the curve rendering window to `el_window`, with the provided viewport bounds.
 * 
 * Also initialises `self.sampler_helper`.
 */
export function desmos_window(
  self: any,
  el_window: HTMLElement,
  {
    x: [x_lower, x_upper],
    y: [y_lower, y_upper],
  }: GraphBounds,
  pi?: true,
): Desmos.Calculator
{
  let window = Desmos.GraphingCalculator(el_window, {
    invertedColors: true,
    border: false,
    expressions: false,
    // expressions: true,  // DEBUG
    showGrid: true,
    xAxisNumbers: false, yAxisNumbers: false,
    xAxisStep: pi ? (Math.PI / 2) : 1, yAxisStep: 1,
    settingsMenu: false,
    lockViewport: true,
  });

  window.setMathBounds({
    left:   x_lower, right: x_upper,
    bottom: y_lower, top:   y_upper,
  });

  return window;
}


export function sampler_helper(
  window: Desmos.Calculator,
  shaper: Shaper,
  {
    x: [x_lower, x_upper],
    y: [y_lower, y_upper],
  }: GraphBounds,
)
{
  const w = INTERNAL.SHAPER_SAMPLE_RES - 1;

  let helper = window.HelperExpression({
    latex: ltx `${Func.SAMPLER}(${x_lower} + ${x_upper - x_lower} * [0...${w}] / ${w})`
  });

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

  // for (let [key, label] of Object.entries(shaper.params)) {

  // }
}
