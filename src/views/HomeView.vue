<script setup>
import { RouterLink } from 'vue-router'
import RegistrationForm from '../components/RegistrationForm.vue'
</script>

<template>
  <main class="home wrapper">
    <h1 class="">
      Nouveau match
    </h1>
    <RegistrationForm />
    <RouterLink to="/round/0" class="btn btn-primary">Démarrer</RouterLink>
  </main>
</template>
