/**
 * Initialise the curve rendering window to `el_window`, with the provided viewport bounds.
 * 
 * This does not initialise any expressions - those are left for `sync_with_editor()`, to avoid duplication.
 */
export function desmos_window(
  el_window: HTMLElement,
  {
    x_lower, x_upper,
    y_lower, y_upper
  }: {
    x_lower: number; x_upper: number;
    y_lower: number; y_upper: number;
  },
  pi?: any,
): Desmos.Calculator
{
  let window = Desmos.GraphingCalculator(el_window, {
    invertedColors: true,
    expressions: false,
    showGrid: true,
    xAxisNumbers: false, yAxisNumbers: false,
    xAxisStep: pi ? (Math.PI / 2) : 1, yAxisStep: 1,
    settingsMenu: true,
    lockViewport: true,
  });

  window.setMathBounds({
    left:   x_lower, right: x_upper,
    bottom: y_lower, top:   y_upper,
  });

  return window;
}
