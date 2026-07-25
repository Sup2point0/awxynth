import { writable } from "svelte/store";


export enum OverlayPage
{
  HELP,
  CHANGELOG,
  CREDITS,

  ADD_SHAPER,
}


export interface NavState
{
  overlay: OverlayPage | null;

  out: boolean;
}


/** The currently open overlay tab, if any. */
export const nav_state = writable<NavState>({
  overlay: null,
  out: false,
});
