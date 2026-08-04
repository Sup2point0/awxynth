import { writable } from "svelte/store";

// NOTE: Direct import to avoid circular imports
import { Docs } from "#scripts/const/docs";

import type { SvelteComponent } from "svelte";


export enum OverlayPage
{
  HELP,
  CHANGELOG,
  CREDITS,

  ADD_SHAPER,
}


/** Global navigation-related state. */
export interface NavState
{
  /** The currently open overlay page, if any. */
  overlay: OverlayPage | null;

  docs_page: [string, SvelteComponent];

  /** Should the master pane be shown? */
  show_master_pane: boolean;
}


/** Global navigation-related state. */
export const nav_state = writable<NavState>(
{
  overlay: null,
  docs_page: ["Quickstart", Docs.core.pages.Quickstart],
  show_master_pane: false,
});
