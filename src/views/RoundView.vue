<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="round wrapper">
    <h1 class="prose prose-2xl">Ronde X</h1>
  </div>
  
  <RouterLink to="/" class="btn btn-secondary">Précédent</RouterLink>
  <RouterLink to="/results" class="btn btn-primary">Suivant</RouterLink>
</template>

<style>
</style>
