<script setup>
import { RouterLink } from 'vue-router'
import RegistrationForm from '../components/RegistrationForm.vue'
</script>

<template>
  <main class="home wrapper">
    <h1 class="prose prose-2xl">
      Nouveau tournoi
    </h1>
    <RegistrationForm />
    <RouterLink to="/round/0" class="btn btn-accent">Démarrer</RouterLink>
  </main>
</template>
