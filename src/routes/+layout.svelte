<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import EmojiBG from '$lib/components/EmojiBG.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
  <title>Dan Cormier</title>
  <meta name="description" content="Frontend engineer based in North Carolina." />
</svelte:head>

<div class="page">
  <EmojiBG />
  <main>{@render children()}</main>
  <Footer />
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }

  main {
    flex: 1;
  }
</style>
