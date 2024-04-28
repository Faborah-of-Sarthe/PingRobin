<script setup>
import { RouterLink } from 'vue-router'
import RegistrationForm from '../components/RegistrationForm.vue'

import { usePlayersStore } from '@/stores/players';

const players = usePlayersStore();
</script>

<template>
  <div class="hero">

    <h1 class="prose prose-2xl">
      Nouveau tournoi
    </h1>
  </div>
  <RegistrationForm />
  <div class="flex justify-center">
    <RouterLink to="/round/0"  :class="{'btn-disabled': players.list.length < 3}" class="btn btn-accent">Démarrer</RouterLink>
  </div>
</template>
