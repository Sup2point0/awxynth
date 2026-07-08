<script lang="ts">

import { synth } from "#scripts/synth";

import { bind_keybinds } from "./keybinds";

import Overlay from "#parts/overlay.svelte";

import { onMount } from "svelte";


onMount(() => {
  bind_keybinds();
});

</script>



<Overlay />
