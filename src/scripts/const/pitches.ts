import { Note, type int } from "#scripts/types";


export const PITCHES: Record<int, Record<Note, int>> =
{
  4: {
    [Note.A]:       440,
    [Note.B_FLAT]:  466.16,
    [Note.B]:       493.875,
    [Note.C]:       523.25,
    [Note.C_SHARP]: 554.37,
    [Note.D]:       587.3,
    [Note.E_FLAT]:  622.25,
    [Note.E]:       659.25,
    [Note.F]:       698.45,
    [Note.F_SHARP]: 740,
    [Note.G]:       784,
    [Note.A_FLAT]:  830.6,
  }
};
