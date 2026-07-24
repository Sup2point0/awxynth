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
  width: 100%;
  height: 100%;
  padding: 0 0.2em 0.15em;
  @include font-ui;
  color: rgb(white, 20%);
  font-size: 200%;
  line-height: 1;
  background: none;
  border: none;
  outline: none;
  @include interact($col-prot);
}

</style>
