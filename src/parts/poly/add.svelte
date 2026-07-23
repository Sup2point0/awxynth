<!-- @component `Add`
 
A button for adding a new shaper.
-->

<script lang="ts">

interface Props {
  /** Callback to execute when the button is pressed. */
  action: () => void;
}

let { action }: Props = $props();

</script>


<button onclick={action}>
  +
</button>


<style lang="scss">

button {
  padding: 1rem;
  @include font-ui;
  color: rgb(white, 20%);
  font-size: 200%;
  background: none;
  border: none;
  outline: none;

  &:hover, &:focus-visible {
    cursor: pointer;
    color: $col-prot;
    background: rgb(white, 2%);
  }

  &:active {
    color: $col-deut;
    background: rgb(white, 8%);
  }
}

</style>
