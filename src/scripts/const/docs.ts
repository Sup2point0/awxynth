import {
  Quickstart, FAQ, Troubleshooting, Glossary,
  SoundFundamentals,
} from "#docs";

import type { SvelteComponent } from "svelte";


/** Map of the available help pages. */
export const Docs: Record<string, {
  title: string | null;
  pages: Record<string, SvelteComponent>;
}>
= {
  core: {
    title: null,
    pages: {
      Quickstart,
      FAQ,
      Troubleshooting,
      Glossary,
    },
  },
  sound_fundamentals: {
    title: "Fundamentals of Sound",
    pages: {
      "Intro":                       SoundFundamentals.Intro,
      "What is sound?":              SoundFundamentals.What_Is_Sound,
      "How do we represent sound?":  SoundFundamentals.How_Represent_Sound,
      "What is frequency?":          SoundFundamentals.What_Is_Freq,
      "How do we hear frequencies?": SoundFundamentals.How_Hear_Freq,
      "Common Gotchas":              SoundFundamentals.Common_Gotchas,
    },
  },
  
  // GRAPH_FUNDAMENTALS = "Fundamentals of Graphs",
  // CLIPPING           = "To Clip or Not To Clip?",
};
