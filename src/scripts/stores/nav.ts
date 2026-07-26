import { writable } from "svelte/store";


export enum OverlayPage
{
  HELP,
  CHANGELOG,
  CREDITS,

  ADD_SHAPER,
}

export enum Docs {
  Quickstart = "Quickstart",
  FAQ        = "FAQ",
  Glossary   = "Glossary",
}


/** Global navigation-related state. */
export interface NavState
{
  /** The currently open overlay page, if any. */
  overlay: OverlayPage | null;

  docs_page: Docs;

  /** Should the output analyser visualisers pane be shown? */
  show_analysers_pane: boolean;
}


/** Global navigation-related state. */
export const nav_state = writable<NavState>(
{
  overlay: null,
  docs_page: Docs.Quickstart,
  show_analysers_pane: false,
});
