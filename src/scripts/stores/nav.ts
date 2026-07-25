import { writable } from "svelte/store";


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

  /** Should the output analyser visualisers pane be shown? */
  show_analysers_pane: boolean;
}


/** Global navigation-related state. */
export const nav_state = writable<NavState>(
{
  overlay: null,
  show_analysers_pane: false,
});
