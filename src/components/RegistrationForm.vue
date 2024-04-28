<script setup>
import { ref } from 'vue'
import { usePlayersStore } from '../stores/players'

const name = ref('');
const players = usePlayersStore();
const inputState = ref('')


function validate(event, checkEmpty = false) {
  console.log(checkEmpty)
  if (!name.value && checkEmpty) {
    inputState.value = 'input-error'
    console.log('empty')
    return false
  }

  else if (players.list.includes(name.value)) {
    inputState.value = 'input-error'
    console.log('duplicate')
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
  <div class="players content">
    <h2 class="prose prose-xl">
      Ajouter un joueur
    </h2>

    <form @submit.prevent="addPlayer" class="registration">
      <div class="field join">
        <label :class="inputState" class="input input-bordered input-primary flex items-center gap-2 join-item">
          <input type="text" id="name" v-model="name" class="grow" placeholder="Jean-Louis" @keyup="validate"/>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
        </label>
        <button type="submit" class="btn btn-primary join-item">Ajouter</button>
      </div>
      <div class="text-error" v-if="inputState === 'input-error'">Le nom est vide ou déjà utilisé</div>
    </form>

    <div class="players-list prose">
      <h3 class="prose prose-lg">Joueurs</h3>
      <div class="names">
        <div v-for="player in players.list" :key="player.id" class="player join w-full justify-between">
          <span class="join-item name">{{ player }}</span>
          <span class="join-item cross cursor-pointer" @click="players.removePlayer(player)">&#10540;</span>
        </div>
      </div>
    </div>
  </div>
</template>
