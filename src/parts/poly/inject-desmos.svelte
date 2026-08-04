<!-- @component `<InjectDesmos>`

Transform ```desmos``` blocks in an MDsveX body to Desmos embeds.
-->

<script lang="ts">

import { onMount } from "svelte";


let { children } = $props();


let root: HTMLElement;

let desmos_instances: Desmos.Calculator[] = [];

onMount(() => {
  let sources = root.querySelectorAll("pre.language-desmos");

  for (let source of sources.values()) {
    source.style.display = "none";

    let el_desmos = source.parentNode!.insertBefore(
      document.createElement("div"),
      source.nextSibling,
    );
    el_desmos.style.height = "20rem";
    el_desmos.style.margin = "1rem 0";

    let desmos = Desmos.GraphingCalculator(el_desmos, {
      expressionsCollapsed: true,
      expressionsTopbar: false,
      invertedColors: true,
      keypad: false,
      settingsMenu: false,
      xAxisNumbers: false, yAxisNumbers: false,
    });

    for (let line of source.textContent.split("\n")) {
      if (line.startsWith("#")) {
        desmos.updateSettings(
          // SAFETY: Trusted static input
          eval(`(${line.slice(1)})`
        ));
        continue;
      }

      desmos.setExpression(
        line.startsWith("{") ?
            eval(`(${line})`)  // SAFETY: Trusted static input
          : { latex: line }
      );
    }

    desmos_instances.push(desmos);
  }

  return () => {
    for (let instance of desmos_instances) {
      instance.destroy();
    }
  };
});

</script>


<div bind:this={root}>
  {@render children?.()}
</div>
