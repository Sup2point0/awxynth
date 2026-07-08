export enum Note {
  A       = "A",
  A_SHARP = "A#", B_FLAT = "A#",
  B       = "B",
  C       = "C",
  C_SHARP = "C#", D_FLAT = "C#",
  D       = "D",
  D_SHARP = "D#", E_FLAT = "D#",
  E       = "E",
  F       = "F",
  F_SHARP = "F#", G_FLAT = "F#",
  G       = "G",
  G_SHARP = "G#", A_FLAT = "G#",
}

/** A note degree with its octave, represented as `<note><octave>`, e.g. `A4` or `F#6`. */
export type OctavedNoteRepr = string;
