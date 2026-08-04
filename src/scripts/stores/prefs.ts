import { persisted } from "svelte-persisted-store";

import type { int } from "#scripts/types";


/** Global user settings, including technicals and preferences. */
export interface UserPrefs
{
  ADVANCED_FEATURES: boolean

  /** How many discrete samples points are taken of a continuous shaper function. */
  SHAPER_SAMPLE_RES: int

  MATHS_TERMS: boolean
}


/** Global user settings, including technicals and preferences. */
export const prefs = persisted<UserPrefs>("awx.prefs",
{
  ADVANCED_FEATURES: false,
  SHAPER_SAMPLE_RES: 512,
  MATHS_TERMS: false,
});
