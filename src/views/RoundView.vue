<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useMatchesStore } from '@/stores/matches'
import { useStatsStore } from '@/stores/stats'
import { ref   } from 'vue'
import H1 from '@/components/H1.vue'
import ProgressBar from '@/components/ProgressBar.vue'

const matches = useMatchesStore()
const stats = useStatsStore()
const router = useRouter()
const modal = ref(false);
const loading = ref(false);


// Redirect to home if no matches have been generated or if the list of matches is empty
if(matches.currentRound === 0  || !matches.list.length) {
  router.push('/')
}

function handlePrevious() {
  if(matches.currentRound > 1) {
    matches.currentRound--
  }else {
    modal.value = true
  }
}

async function handleNext() {

  if(matches.currentRound < matches.list.length) {
    matches.currentRound++
    const input = document.querySelector('.match input')
    if(input && stats.scoreEnabled) {
      input.focus()
    }
  }else {
    if(stats.scoreEnabled) {
      await stats.generate(matches.list)
    }
    router.push('/results')
  }
}

</script>

<template>
  <div class="small-container">
    <div class="hero mb-8">
      <div class="hero-content flex flex-col">
        <H1>Ronde {{ matches.currentRound }}</H1>
        <ProgressBar></ProgressBar>
      </div>
    </div>
    <div class="matches content">
      <div class="matches-list">
        <div v-for="(match, index) in matches.list[matches.currentRound - 1]" :key="`round-${index}`" class="match">
          <div class="match flex justify-center items-center mb-4 break-all">
            <div class="player prose prose-l flex-1">{{
            match.player1
            }}</div>
            <div class="score flex-nowrap flex" >
              <template v-if="stats.scoreEnabled">
                <input :disabled="match.fake" type="number" min="0" placeholder="0" v-model.number="matches.list[matches.currentRound - 1][index].score1" class="input w-12 bg-slate-200 text-center font-bold prose p-2 mr-2 focus:outline-none" />
                <input :disabled="match.fake" type="number" min="0" placeholder="0" v-model.number="matches.list[matches.currentRound - 1][index].score2" class="input w-12 bg-slate-200 text-center font-bold prose p-2   focus:outline-none" />
              </template>
              <template v-else>
                <div class="flex items-center text-slate-500 font-bold">vs</div>
              </template>
            </div>
            <div class="player prose prose-l flex-1 text-right break-all">{{
            !match.fake ? match.player2 : ''
            }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-8 flex-row-reverse">
      <button :disabled="stats.scoreEnabled ? matches.disabledNext : false" class="btn btn-primary"  @click="handleNext"><span v-if="loading" class="loading loading-spinner loading-xs"></span> {{ matches.isLastRound ? 'Aller aux résultats' : 'Suivant '}}</button>
      <button class="btn btn-outline" @click="handlePrevious">Précédent</button>
    </div>
    <dialog id="modal" class="modal" :class="{'modal-open': modal}">
      <div class="modal-box">
        <form method="dialog">
          <button @click="modal = false" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-lg">Revenir aux choix des joueurs ?</h3>
        <p class="py-4">
          Vous êtes sur le point de revenir à la page d'accueil. Vous pourrez alors modifier la liste des joueurs et recalculer les matchs.
        </p>
        <div class="flex justify-between">
          <button class="btn btn-outline" @click="modal = false">Annuler</button>
          <RouterLink to="/" class="btn btn-secondary">Précédent</RouterLink>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button  @click="modal = false">close</button>
      </form>
    </dialog>
  </div>

</template>

<style>
</style>
