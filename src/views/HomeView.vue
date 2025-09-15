<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import RegistrationForm from '../components/RegistrationForm.vue'
import H1 from '@/components/H1.vue';

import { usePlayersStore } from '@/stores/players';
import { useMatchesStore } from '@/stores/matches';
import { useStatsStore } from '@/stores/stats';

const modal = ref(false);
const players = usePlayersStore();
const matches = useMatchesStore();
const stats = useStatsStore();
const router = useRouter()
const loading = ref(false);

async function  launchTournament() {
  loading.value = true;
  await matches.generateMatches(players.list);
  stats.reset();

  modal.value = false;
  if(matches.list.length) {
    matches.currentRound = 1;
    router.push('/rounds');
  } 
  loading.value = false;
}
</script>

<template>
  <div class="hero">
    <H1>
      Nouveau tournoi
    </H1>
  </div>
  <RegistrationForm />
  
  <div class="flex justify-center mb-6">
    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text mr-4">Compter les points :</span>
        <input type="checkbox" v-model="stats.scoreEnabled" class="toggle toggle-primary" />
      </label>
    </div>
  </div>
  
  <div class="flex justify-center">
    <button to="/round/0" @click="modal = true"  :class="{'btn-disabled': players.list.length < 3}" class="btn btn-primary">Démarrer</button>
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
        <button class="btn btn-primary" @click="launchTournament"><span v-if="loading" class="loading loading-spinner loading-xs"></span> Commencer</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button  @click="modal = false">close</button>
    </form>
  </dialog>
</template>
