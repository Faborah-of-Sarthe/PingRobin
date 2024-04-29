<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import RegistrationForm from '../components/RegistrationForm.vue'

import { usePlayersStore } from '@/stores/players';
const modal = ref(false);
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
    <button to="/round/0" @click="modal = true"  :class="{'btn-disabled': players.list.length < 3}" class="btn btn-accent">Démarrer</button>
  </div>
  <dialog id="modal" class="modal" :class="{'modal-open': modal}">
    <div class="modal-box">
      <form method="dialog">
        <button @click="modal = false" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-lg">Lancer les matchs ?</h3>
      <p class="py-4">
        Vous êtes sur le point de lancer les matchs. Une fois les matchs lancés, vous ne pourrez plus ajouter de joueurs.
      </p>
      <div class="flex justify-between">
        <button class="btn btn-outline" @click="modal = false">Annuler</button>
        <button class="btn btn-accent">Commencer</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button  @click="modal = false">close</button>
    </form>
  </dialog>
</template>
