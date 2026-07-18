import { Theme } from "#scripts/const";

import { Id } from "./expressions";


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
