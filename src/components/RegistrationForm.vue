<script setup>
import { ref } from 'vue'
import { usePlayersStore } from '../stores/players'

const name = ref('');
const players = usePlayersStore();
const inputState = ref('')


function validate(event, checkEmpty = false) {
  if (!name.value && checkEmpty) {
    inputState.value = 'input-error'
    return false
  }

  else if (players.list.includes(name.value)) {
    inputState.value = 'input-error'
    return false
  }
  
  inputState.value = '';
  return true;
}

function addPlayer() {
  if (!validate(null, true)) return
  players.addPlayer(name.value)
  inputState.value = ''
  name.value = ''
}
</script>

<template>
  <div class="players content flex flex-col items-center">
    <h2 class="prose prose-xl mb-2 mt-2">
      Ajouter un joueur
    </h2>

    <form @submit.prevent="addPlayer" class="registration mb-5">
      <div class="field join join-horizontal">
        <label :class="inputState" class="input input-bordered input-primary flex items-center gap-2 join-item">
          <input type="text" id="name" v-model="name" class="grow w-full" placeholder="Jean-Louis" @keyup="validate"/>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
        </label>
        <button type="submit" class="btn btn-primary join-item">Ajouter</button>
      </div>
      <div class="text-error" v-if="inputState === 'input-error'">Le nom est vide ou déjà utilisé</div>
      </form>

    <div class="players-list prose max-w-96 w-full">
      <h3 class="prose prose-lg mb-2">Joueurs</h3>
      <div class="names mb-4">
        <div v-for="(player, index) in players.list" :key="index" class="player p-2 join w-full justify-between mb-2 even:bg-slate-100" >
          <span class="join-item name">{{ player }}</span>
          <button class="btn-sm btn-circle" @click="players.removePlayer(player)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div v-if="players.list.length == 0" role="alert" class="alert flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Ajoutez des joueurs grâce au champ ci-dessus.</span>
        </div>
      </div>
    </div>
  </div>
</template>
