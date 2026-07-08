<!-- @component Keyboard -->

<script lang="ts">

import { synth } from "#scripts/synth";
import { Note, type int } from "#scripts/types";
import { WHITE_NOTES, BLACK_NOTES } from "#scripts/const";

</script>


<ul class="keyboard">
  {#each { length: 7 } as _, octave}
    {#each WHITE_NOTES as note}
      <li class="key white"
        class:active={synth.active_notes.has(`${note}${octave}`)}
      >
        {Note[note]}{octave}
      </li>
    {/each}
  {/each}
</ul>


<style lang="scss">

.keyboard {
  display: flex;
  flex-flow: row nowrap;
  gap: 0.1rem;
  list-style: none;
}

.key {
  width: 1rem;
  height: 3rem;
  @include font-fun;
  font-size: 75%;
  color: #aaa;
  background: white;

  &.active {
    background: pink;
  }
}

</style>
