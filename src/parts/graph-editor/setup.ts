import { FUNC_SAMPLE_RES } from "#scripts/const";
import { ltx } from "#scripts/utils";


/**
 * Initialise the curve rendering window to `el_window`, with the provided viewport bounds.
 */
export function desmos_window(
  self: any,
  el_window: HTMLElement,
  {
    x_lower, x_upper,
    y_lower, y_upper
  }: {
    x_lower: number; x_upper: number;
    y_lower: number; y_upper: number;
  },
  pi?: true,
): Desmos.Calculator
{
  let window = Desmos.GraphingCalculator(el_window, {
    invertedColors: true,
    expressions: false,
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

  const w = FUNC_SAMPLE_RES - 1;

  self.sampler_helper = window.HelperExpression({
    latex: ltx `g(${x_lower} + ${x_upper - x_lower} * [0...${w}] / ${w-1})`
  });

  return window;
}
