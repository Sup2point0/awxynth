import { OverlayTab } from "#src/routes/tabs";

import { writable } from "svelte/store";


/** The currently open overlay tab, if any. */
export const overlay_tab = writable<OverlayTab | null>(null);
