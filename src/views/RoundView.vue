<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useMatchesStore } from '@/stores/matches'

const matches = useMatchesStore()
const router = useRouter()

// Redirect to home if no matches have been generated or if the list of matches is empty
if(matches.currentRound === 0 || !matches.list.length) {
  router.push('/')
}


</script>

<template>
  <div class="hero mb-4">
    <h1 class="prose prose-2xl">Ronde {{ matches.currentRound }}</h1>
  </div>
  <div class="matches content">
    <div class="matches-list">
      <div v-for="(match, index) in matches.list[matches.currentRound - 1]" :key="index" class="match">
        <div class="match flex justify-between items-center mb-4">
          <div class="player prose prose-l flex-1">{{
          match.player1
          }}</div>
          <div class="score flex-2">
            <input type="text" placeholder="0" v-model="matches.list[matches.currentRound - 1][index].score1" class="input w-12 bg-slate-200 text-center font-bold prose p-2 mr-2 focus:outline-none" />
            <input type="text" placeholder="0" v-model="matches.list[matches.currentRound - 1][index].score2" class="input w-12 bg-slate-200 text-center font-bold prose p-2   focus:outline-none" />
          </div>
          <div class="player prose prose-l flex-1 text-right">{{
          match.player2
          }}</div>
        </div>
      </div>
    </div>
  </div>

  
  <RouterLink to="/" class="btn btn-secondary">Précédent</RouterLink>
  <RouterLink to="/results" class="btn btn-primary">Suivant</RouterLink>
</template>

<style>
</style>
