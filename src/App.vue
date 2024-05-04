<script setup>
import { RouterView } from 'vue-router'
import PwaButton from '@/components/PwaButton.vue';
</script>

<template>
  <main class="main container">
    <RouterView />
  </main>
  <footer class="footer footer-center p-4 bg-neutral text-base-content">
    <PwaButton />
    <aside>
      <p>Réalisé par <a href="https://lude-web.studio" class="font-bold" target="_blank">Lude Web Studio</a></p>
    </aside>
</footer>
</template>

<style scoped>
</style>
