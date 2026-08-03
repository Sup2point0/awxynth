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
  el_window: HTMLElement,
  {
    x: [x_lower, x_upper], x_pi,
    y: [y_lower, y_upper], y_pi,
  }: GraphBounds,
): Desmos.Calculator
{
  let window = Desmos.GraphingCalculator(el_window, {
    border: false,
    expressions: false,
    // expressions: true,  // DEBUG
    invertedColors: true,
    lockViewport: true,
    settingsMenu: false,
    showGrid: true,
    xAxisNumbers: false, xAxisStep: x_pi ? (Math.PI / 2) : 1,
    yAxisNumbers: false, yAxisStep: y_pi ? (Math.PI / 2) : 1,
  });

  window.setMathBounds({
    left:   x_lower, right: x_upper,
    bottom: y_lower, top:   y_upper,
  });

  return window;
}


/**
 * Initialise Desmos helper expressions for sampling amplitudes from the shaper curve, and syncing other $φ_{param}$ parameters (if any).
 */
export function sync_helpers(
  window: Desmos.Calculator,
  shaper: Shaper,
  { x: [x_lower, x_upper] }: GraphBounds,
)
{
  const w = INTERNAL.SHAPER_SAMPLE_RES - 1;

  let amps = window.HelperExpression({
    latex: ltx `${Func.SAMPLER}(${x_lower} + (${x_upper} - ${x_lower}) * [0...${w}] / ${w})`
  });

  amps.observe("listValue", () => {
    if (amps.listValue == undefined) return;
    let data = amps.listValue;
    shaper.amps = shaper.clip_on ? util.clip(data) : util.sanitise(data);
  });
  
  amps.observe("numericValue", () => {
    if (amps.numericValue == undefined) return;
    if (Number.isNaN(amps.numericValue)) return;

    let data = [amps.numericValue, amps.numericValue];
    shaper.amps = shaper.clip_on ? util.clip(data) : util.sanitise(data);
  });

  for (let [key, label] of Object.entries(shaper.params)) {
    let param = window.HelperExpression({
      latex: ltx `\phi_{${label}}`
    });

    param.observe("numericValue", () => {
      if (param.numericValue == undefined) return;
      if (Number.isNaN(param.numericValue)) return;

      // @ts-ignore (`key :: keyof shaper`)
      shaper[key] = param.numericValue;
    });
  }
}
