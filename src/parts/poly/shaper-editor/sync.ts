import { Theme } from "#scripts/const";

import * as util from "#scripts/utils";
import ltx from "#scripts/utils";
import type { Shaper, ShaperPreset } from "#scripts/types";

import { Id, Func, is_shaper, USER_ID_PREFIX, INTERNAL_ID_PREFIX } from "./expressions";


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
 * Update `window` to reflect the expressions in `editor`.
 */
export function window_with_editor(
  self: any,
  shaper: Shaper,
  window: Desmos.Calculator,
  editor: Desmos.Calculator,
)
{
  let user_exprs = editor.getExpressions().map(expr => ({
    ...expr,
    id: `${USER_ID_PREFIX}-${expr.id}`,
    hidden: true,
  }));

  /* If the user's deleted their shaper, wait until they provide a new one before syncing again */
  if (!user_exprs.some(expr => is_shaper(expr))) return;

  clear_user_expressions(window);
  window.setExpressions(user_exprs);

  let clipped = String.raw `\operatorname{min}(1, \operatorname{max}(-1, f(x)))`;
  let fx = shaper.clip_on ? clipped : "f(x)";

  /* NOTE: Sample from this curve, which handles clipping. */
  window.setExpression({
    id: Id.SHAPER_CLIPPER,
    latex: ltx `${Func.SAMPLER}(x) = ${fx}`,
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
    latex: ltx `\min(${fx}, 0) \le y \le \max(${fx}, 0)`,
    color: util.invert(shaper.colour),
    lines: false,
    fillOpacity: Theme.WAVE_OPACITY,
    hidden: false,
  });
}

/**
 * Remove non-internal expressions from `window`.
 */
function clear_user_expressions(window: Desmos.Calculator)
{
  let user_exprs =
    window
    .getExpressions()
    .filter(expr => expr.id != undefined)
    .filter(expr => !expr.id?.startsWith(INTERNAL_ID_PREFIX))
    .map(expr => expr as { id: string })
  ;

  window.removeExpressions(user_exprs);
}


/**
 * Clear `editor` and apply `preset`.
 */
export function apply_preset(editor: Desmos.Calculator, preset: ShaperPreset)
{
  editor.setBlank();

  // `Latex`
  if (!Array.isArray(preset.latex)) {
    editor.setExpression({ id: "any", latex: preset.latex });
    return;
  }
  
  for (let [i, expr] of preset.latex.entries()) {
    // `Latex[]`
    if (typeof expr === "string") {
      editor.setExpression({ id: `any-${i}`, latex: expr });
    }
    // `Desmos.ExpressionState[]`
    else {
      editor.setExpression({ id: `any-${i}`, ...expr });
    }
  }
}
