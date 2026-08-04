import { prefs } from "#scripts/stores";
import type { GraphBounds, Shaper } from "#scripts/types";
import * as util from "#scripts/utils";
import { ltx } from "#scripts/utils";

import { Func } from "./expressions";

import { get } from "svelte/store";


/**
 * Initialise the curve rendering window to `el_window`, with the provided viewport bounds.
 * 
 * Also initialises `self.sampler_helper`.
 */
export function desmos_window(
  el_window: HTMLElement,
  {
    x_pi = false,
    y_pi = false
  }: GraphBounds
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

  return window;
}


/**
 * Initialise Desmos helper expressions for sampling amplitudes from the shaper curve, and syncing other $φ_{param}$ parameters (if any).
 */
export function sync_helpers(
  window: Desmos.Calculator,
  shaper: Shaper,
)
{
  const w = get(prefs).SHAPER_SAMPLE_RES - 1;
  let { x: [x_lower, x_upper] } = shaper.bounds;

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
