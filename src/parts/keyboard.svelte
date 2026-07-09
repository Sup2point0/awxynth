<!-- @component Keyboard -->

<script lang="ts">

import { synth } from "#scripts/synth";
import { Note, type int } from "#scripts/types";
import { MAX_OCTAVE, NUM_DEGREES, WHITE_NOTES, BLACK_NOTES } from "#scripts/const";

</script>


<ul class="keyboard">
  {#each { length: MAX_OCTAVE + 1 } as _, octave}
    {#each { length: NUM_DEGREES } as _, degree}
      {@const white = WHITE_NOTES[degree]}
      {@const black = BLACK_NOTES[degree]}

      <div class="segment">
        <li class="key white"
          class:active={synth.active_notes.has(`${white}${octave}`)}
        >
          {white} <sub>{octave}</sub>
        </li>

        {#if black}
          <li class="key black"
            class:active={synth.active_notes.has(`${black}${octave}`)}
          ></li>
        {/if}
      </div>
    {/each}
  {/each}
</ul>


<style lang="scss">

$note-width: 1.25rem;
$note-height: 4rem;


.keyboard {
  padding: 0.1rem;
  display: flex;
  flex-flow: row nowrap;
  gap: 0.1rem;
  list-style: none;
}

.segment {
  width: $note-width;
  position: relative;
}

.key {
  &.white {
    width: $note-width;
    height: $note-height;;
    display: flex;
    justify-content: center;
    align-items: end;
    @include font-fun;
    font-size: 75%;
    color: #aaa;
    background: white;
  }

  &.black {
    width: $note-width * 0.65;
    height: $note-height * 0.6;
    position: absolute;
    top: 0;
    left: $note-width;
    z-index: 2;
    background: black;
    transform: translateX(-50%);
  }

  &.active {
    background: pink;
  }
}

</style>
