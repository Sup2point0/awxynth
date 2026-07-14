import { synth } from "#scripts/synth";
import { Note } from "#scripts/types";


export function bind_keybinds()
{
  window.addEventListener("keydown", handle_keydown);
  return () => window.removeEventListener("keydown", handle_keydown);
}

function handle_keydown(e: KeyboardEvent)
{
  if (e.repeat) return;
  if (document.activeElement?.tagName.toLowerCase() === "textarea") return;

  keybind: {
    switch (e.key.toUpperCase()) {
      case "A":   synth.play(Note.A,       synth.octave); break keybind;
        case "W": synth.play(Note.B_FLAT,  synth.octave); break keybind;
      case "S":   synth.play(Note.B,       synth.octave); break keybind;
      case "D":   synth.play(Note.C,       synth.octave); break keybind;
        case "R": synth.play(Note.C_SHARP, synth.octave); break keybind;
      case "F":   synth.play(Note.D,       synth.octave); break keybind;
        case "T": synth.play(Note.E_FLAT,  synth.octave); break keybind;
      case "G":   synth.play(Note.E,       synth.octave); break keybind;
      case "H":   synth.play(Note.F,       synth.octave); break keybind;
        case "U": synth.play(Note.F_SHARP, synth.octave); break keybind;
      case "J":   synth.play(Note.G,       synth.octave); break keybind;
        case "I": synth.play(Note.A_FLAT,  synth.octave); break keybind;
      case "K":   synth.play(Note.A,       synth.octave + 1); break keybind;
        case "O": synth.play(Note.B_FLAT,  synth.octave + 1); break keybind;
      case "L":   synth.play(Note.B,       synth.octave + 1); break keybind;
      default: return;
    }
  }

  e.stopPropagation();
}
