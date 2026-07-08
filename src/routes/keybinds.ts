import { synth } from "#scripts/synth";
import { Note } from "#scripts/types";


export function bind_keybinds()
{
  window.addEventListener("keydown", handle_keydown);
}

function handle_keydown(e: KeyboardEvent)
{
  keybind: {
    switch (e.key.toUpperCase()) {
      case "A": synth.play(Note.A, 4);         break keybind;
        case "W": synth.play(Note.B_FLAT, 4);  break keybind;
      case "S": synth.play(Note.B, 4);         break keybind;
      case "D": synth.play(Note.C, 4);         break keybind;
        case "R": synth.play(Note.C_SHARP, 4); break keybind;
      case "F": synth.play(Note.D, 4);         break keybind;
        case "T": synth.play(Note.E_FLAT, 4);  break keybind;
      case "G": synth.play(Note.E, 4);         break keybind;
      case "H": synth.play(Note.F, 4);         break keybind;
        case "U": synth.play(Note.F_SHARP, 4); break keybind;
      case "J": synth.play(Note.G, 4);         break keybind;
        case "I": synth.play(Note.A_FLAT, 4);  break keybind;
      case "K": synth.play(Note.A, 5);         break keybind;
        case "O": synth.play(Note.B_FLAT, 5);  break keybind;
      case "L": synth.play(Note.B, 5);         break keybind;
      default: return;
    }
  }

  e.stopPropagation();
}
