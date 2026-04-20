<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status} — Dan Cormier</title>
</svelte:head>

<div class="error">
  <h1>{$page.status}</h1>
  <p>{$page.error?.message ?? 'Page not found'}</p>
  <a href="/">← Home</a>
</div>

<style>
  .error {
    max-width: 900px;
    margin: 0 auto;
    padding: 10vh 1.5rem 0;
    text-align: center;
  }

  h1 {
    color: var(--color-primary);
    font-family: var(--font-heading);
    font-size: 4rem;
    margin: 0;
  }

  p {
    color: var(--color-secondary);
    font-size: 1.2rem;
  }
</style>
