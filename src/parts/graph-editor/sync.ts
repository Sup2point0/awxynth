import { Theme } from "#scripts/const";
import * as util from "#scripts/utils";
import type { Latex, ShaperPreset } from "#scripts/types";

import { Id, is_shaper } from "./expressions";


/**
 * Update `desmos_window` settings to reflect `is_focused`.
 */
export function focus_window(desmos_window: Desmos.Calculator, is_focused: boolean)
{
  desmos_window?.updateSettings({
    xAxisNumbers: is_focused, yAxisNumbers: is_focused,
  });

  desmos_window?.setExpression({
    id: Id.SHAPER_FILL,
    fillOpacity: (is_focused ? 1.5 : 1) * Theme.WAVE_OPACITY
  });
}


/**
 * Update `desmos_window` to reflect the shaper in `desmos_editor`, if found.
 */
export function window_with_editor(
  desmos_window: Desmos.Calculator,
  desmos_editor: Desmos.Calculator,
  colour: string,
)
{
  let latex = find_shaper_in_editor(desmos_editor);
  if (latex == undefined) return;

  desmos_window.setExpression({
    id: Id.SHAPER_RENDER,
    latex,
    color: util.invert(colour),
  });
  desmos_window.setExpression({
    id: Id.SHAPER_FILL,
    latex: String.raw `\min(f(x), 0) \le y \le \max(f(x), 0)`,
    color: util.invert(colour),
    lines: false,
    fillOpacity: Theme.WAVE_OPACITY,
  });
}

function find_shaper_in_editor(desmos_editor: Desmos.Calculator): Latex | undefined
{
  let expressions = desmos_editor.getExpressions();
  if (expressions == undefined) {
    console.error(`awxynth: Failed to fetch desmos expressions`);
    return;
  }

  let shaper_expr = expressions.find(expr => is_shaper(expr));
  if (shaper_expr == undefined) return;

  return shaper_expr.latex;
}


/**
 * Clear `desmos_editor` and apply `preset`.
 */
export function apply_preset(desmos_editor: Desmos.Calculator, preset: ShaperPreset)
{
  desmos_editor.setBlank();

  if (!Array.isArray(preset.latex)) {
    desmos_editor.setExpression({ id: Id.SHAPER, latex: preset.latex });
    return;
  }
  
  for (let [i, latex] of preset.latex.entries()) {
    desmos_editor.setExpression({ id: `${Id.SHAPER}-${i}`, latex });
  }
}
