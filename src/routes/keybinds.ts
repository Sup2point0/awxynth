import { synth } from "#scripts/synth";
import { Note } from "#scripts/types";


export function bind_keybinds()
{
  window.addEventListener("keydown", handle_keydown);
  window.addEventListener("keyup",   handle_keyup);

  return () => {
    window.removeEventListener("keydown", handle_keydown);
    window.removeEventListener("keyup",   handle_keyup);
  };
}

function handle_keydown(e: KeyboardEvent)
{
  if (e.repeat) return;
  if (document.activeElement?.tagName.toLowerCase() === "textarea") return;

  keybind: {
    switch (e.key.toUpperCase()) {
      case "A":   synth.start(Note.A,       synth.octave); break keybind;
        case "W": synth.start(Note.B_FLAT,  synth.octave); break keybind;
      case "S":   synth.start(Note.B,       synth.octave); break keybind;
      case "D":   synth.start(Note.C,       synth.octave); break keybind;
        case "R": synth.start(Note.C_SHARP, synth.octave); break keybind;
      case "F":   synth.start(Note.D,       synth.octave); break keybind;
        case "T": synth.start(Note.E_FLAT,  synth.octave); break keybind;
      case "G":   synth.start(Note.E,       synth.octave); break keybind;
      case "H":   synth.start(Note.F,       synth.octave); break keybind;
        case "U": synth.start(Note.F_SHARP, synth.octave); break keybind;
      case "J":   synth.start(Note.G,       synth.octave); break keybind;
        case "I": synth.start(Note.A_FLAT,  synth.octave); break keybind;
      case "K":   synth.start(Note.A,       synth.octave + 1); break keybind;
        case "O": synth.start(Note.B_FLAT,  synth.octave + 1); break keybind;
      case "L":   synth.start(Note.B,       synth.octave + 1); break keybind;
      case ";":   synth.start(Note.C,       synth.octave + 1); break keybind;
        case "[": synth.start(Note.C_SHARP, synth.octave + 1); break keybind;
        case "'": synth.start(Note.D,       synth.octave + 1); break keybind;
        case "]": synth.start(Note.E_FLAT,  synth.octave + 1); break keybind;

      case "X": synth.transpose_octave("up"); break keybind;
      case "Z": synth.transpose_octave("down"); break keybind;

      default: return;
    }
  }

  e.stopPropagation();
}

function handle_keyup(e: KeyboardEvent)
{
  if (document.activeElement?.tagName.toLowerCase() === "textarea") return;

  keybind: {
    switch (e.key.toUpperCase()) {
      case "A":   synth.stop(Note.A,       synth.octave); break keybind;
        case "W": synth.stop(Note.B_FLAT,  synth.octave); break keybind;
      case "S":   synth.stop(Note.B,       synth.octave); break keybind;
      case "D":   synth.stop(Note.C,       synth.octave); break keybind;
        case "R": synth.stop(Note.C_SHARP, synth.octave); break keybind;
      case "F":   synth.stop(Note.D,       synth.octave); break keybind;
        case "T": synth.stop(Note.E_FLAT,  synth.octave); break keybind;
      case "G":   synth.stop(Note.E,       synth.octave); break keybind;
      case "H":   synth.stop(Note.F,       synth.octave); break keybind;
        case "U": synth.stop(Note.F_SHARP, synth.octave); break keybind;
      case "J":   synth.stop(Note.G,       synth.octave); break keybind;
        case "I": synth.stop(Note.A_FLAT,  synth.octave); break keybind;
      case "K":   synth.stop(Note.A,       synth.octave + 1); break keybind;
        case "O": synth.stop(Note.B_FLAT,  synth.octave + 1); break keybind;
      case "L":   synth.stop(Note.B,       synth.octave + 1); break keybind;
      default: return;
    }
  }

  e.stopPropagation();
}
