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
  <div class="container">
    <div v-if="!breakpoints.greaterOrEqual('sm').value" class="row">
      <div class="col-12 mb-4 ">
        <label class="label">
          <span class="label-text">Résultats par :</span>
        </label>
        <select v-model="statsStore.activeColumn" class="select w-full select-primary">
          <option v-for="column in statsStore.columns.filter(col => col.sortable === true)" :key="column.name" :value="column.name">{{ column.label }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table table-zebra text-base">
          <thead>
            <tr>
              <th>#</th>
              <template v-for="column in statsStore.columns" :key="column">
                <th v-if="isVisible(column.name)" :class="{'cursor-pointer': column.sortable}" class="text-right"  @click="statsStore.sortBy(column.name)">{{ column.label }} </th> 
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in statsStore.stats" :key="index">
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
