import { writable } from "svelte/store";


export enum OverlayTab
{
  HELP,
  CHANGELOG,
  CREDITS,

  ADD_SHAPER,
}


/** The currently open overlay tab, if any. */
export const overlay_tab = writable<OverlayTab | null>(null);
