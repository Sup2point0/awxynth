/**
 * Svelte attachment turning an element into a toggle. When interacted with, the element calls `toggle`.
 */
export function toggles(toggle: () => void)
{
  return (node: HTMLElement) => {
    if (node == undefined) return;

    node.onclick = toggle;

    node.onkeydown = e => {
      if (e.key === "Enter" || e.key === " ") toggle();
    };
  };
}
