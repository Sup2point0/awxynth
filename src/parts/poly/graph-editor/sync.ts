import { Theme } from "#scripts/const";
import { ltx } from "#scripts/utils";
import * as util from "#scripts/utils";
import { Shaper } from "#scripts/shapers";
import type { Latex, ShaperPreset } from "#scripts/types";

import { Id, is_shaper } from "./expressions";


/**
 * Update `desmos_window` settings to reflect `is_focused`.
 */
export function focus_window(window: Desmos.Calculator, should_focus: boolean)
{
  window?.updateSettings({
    xAxisNumbers: should_focus, yAxisNumbers: should_focus,
  });

  window?.setExpression({
    id: Id.SHAPER_RENDER_FILL,
    fillOpacity: (should_focus ? 1.5 : 1) * Theme.WAVE_OPACITY
  });
}


/**
 * Update `desmos_window` to reflect the shaper in `desmos_editor`, if found.
 */
export function window_with_editor(
  self: any,
  shaper: Shaper<any, any>,
  window: Desmos.Calculator,
  editor: Desmos.Calculator,
)
{
  let latex = find_shaper_in_editor(editor);
  if (latex == undefined) return;

  window.setExpression({
    id: Id.SHAPER,
    latex,
    hidden: true,
  });

  let clipped = String.raw `\operatorname{min}(1, \operatorname{max}(-1, f(x)))`;

  /* NOTE: Sample from this curve, which handles clipping. */
  window.setExpression({
    id: Id.SHAPER_CLIPPER,
    latex: (
      shaper.clip_on ?
        ltx `g(x) = ${clipped}`
      : ltx `g(x) = f(x)`
    ),
    hidden: true,
  });

  /* NOTE: These 2 are purely for display purposes */
  window.setExpression({
    id: Id.SHAPER_RENDER,
    latex: ltx `y = f(x)`,
    color: util.invert(shaper.colour),
    lineOpacity: shaper.clip_on ? 0.2 : 1,
    hidden: shaper.clip_on && !self.ghost_enabled,
  });
  window.setExpression({
    id: Id.SHAPER_RENDER_CLIPPED,
    latex: ltx `y = ${clipped}`,
    color: util.invert(shaper.colour),
    hidden: !shaper.clip_on,
  });

  window.setExpression({
    id: Id.SHAPER_RENDER_FILL,
    latex: (
      shaper.clip_on ?
        String.raw `\min(${clipped}, 0) \le y \le \max(${clipped}, 0)`
      : String.raw `\min(f(x), 0) \le y \le \max(f(x), 0)`
    ),
    color: util.invert(shaper.colour),
    lines: false,
    fillOpacity: Theme.WAVE_OPACITY,
    hidden: false,
  });
}

function find_shaper_in_editor(editor: Desmos.Calculator): Latex | undefined
{
  let expressions = editor.getExpressions();
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
export function apply_preset(editor: Desmos.Calculator, preset: ShaperPreset)
{
  editor.setBlank();

  if (!Array.isArray(preset.latex)) {
    editor.setExpression({ id: Id.SHAPER, latex: preset.latex });
    return;
  }
  
  for (let [i, latex] of preset.latex.entries()) {
    editor.setExpression({ id: `${Id.SHAPER}-${i}`, latex });
  }
}
