<script setup>
import { RouterLink } from 'vue-router'
import H1 from '@/components/H1.vue';
import { useStatsStore } from '@/stores/stats';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { computed, reactive } from 'vue';

const statsStore = useStatsStore();
const breakpoints = reactive(useBreakpoints(breakpointsTailwind))

const isVisible = (columnKey) => {
  if(breakpoints.greaterOrEqual('sm').value || columnKey === 'player') {
    return true;
  } else {
    return columnKey === statsStore.activeColumn;
  }
};

</script>

<template>
  <div class="hero mb-8">
    <H1>Résultats</H1>
  </div>
  <div v-if="!statsStore.scoreEnabled" class="container text-center mb-8">
    <div class="alert alert-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span>Le décompte des points était désactivé pour ce tournoi. Aucun classement n'est disponible.</span>
    </div>
  </div>
  <div v-else class="container">
    <div v-if="!breakpoints.greaterOrEqual('sm').value" class="row">
      <div class="col-12 mb-4 ">
        <label class="label">
          <span class="label-text">Résultats par :</span>
        </label>
        <select v-model="statsStore.activeColumn" class="select w-full select-primary">
          <option v-for="column in statsStore.columns.filter(col => col.sortable === true)" :key="column.name" :value="column.name">{{ column.label }}</option>
        </select>
        <div v-if="statsStore.activeColumn == 'totalPositiveGoalDifference'" role="alert" class="alert flex mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Seuls comptent les points de différence avec l'adversaire en cas de victoire.</span>
        </div>
        <div v-if="statsStore.activeColumn == 'points'" role="alert" class="alert flex mt-4 text-left">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Les points sont donnés selon la logique suivante : 
            <ul class="list-disc pl-4">
              <li>3 points pour une victoire</li>
              <li>1 point pour un match nul</li>
              <li>0 point pour une défaite</li>
            </ul>
          </span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table text-base">
          <thead>
            <tr>
              <th>#</th>
              <template v-for="column in statsStore.columns" :key="column">
                <th v-if="isVisible(column.name)" :class="{'cursor-pointer': column.sortable}" class="text-right"  @click="statsStore.sortBy(column.name)">{{ column.label }} </th> 
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in statsStore.stats" :key="index" class="odd:bg-slate-100">
              <td class="w-4">{{ index + 1 }}</td>
              <template v-for="column in statsStore.columns" :key="column.name">
                <td :class="{'text-right w-4': column.name !== 'player'}"  v-if="isVisible(column.name)">{{ player[column.name] }}</td>
              </template>
            </tr>
          </tbody>          
        </table>
      </div>
    </div>
  </div>
  <div class="flex justify-center mt-8">
    <RouterLink to="/" class="btn btn-primary">Nouveau tournoi</RouterLink>
  </div>
</template>

<style>
</style>
