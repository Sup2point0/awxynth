import { writable } from "svelte/store";


export enum OverlayPage
{
  HELP,
  CHANGELOG,
  CREDITS,

  ADD_SHAPER,
}

export enum Docs {
  QUICKSTART      = "Quickstart",
  FAQ             = "FAQ",
  TROUBLESHOOTING = "Troubleshooting",
  GLOSSARY        = "Glossary",

  // TECHNICALS         = "Group:Technicals",
  // SOUND_FUNDAMENTALS = "Fundamentals of Sound",
  // GRAPH_FUNDAMENTALS = "Fundamentals of Graphs",
  // CLIPPING           = "To Clip or Not To Clip?",
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
  docs_page: Docs.QUICKSTART,
  show_analysers_pane: false,
});
