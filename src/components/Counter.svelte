<script lang="ts">
  let count = 0
</script>

<button on:click={() => count += 1}>{count}</button>

<style>
  button {
    background-color: violet;
  }
</style>
