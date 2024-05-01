<script setup>
import { RouterLink } from 'vue-router'
import H1 from '@/components/H1.vue';
import { useStatsStore } from '@/stores/stats';

const statsStore = useStatsStore();
</script>

<template>
  <div class="hero mb-8">
    <H1>Résultats</H1>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th :class="{'cursor-pointer': column.sortable}" v-for="column in statsStore.columns" :key="column" @click="statsStore.sortBy(column.name)">{{ column.label }} </th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in statsStore.stats" :key="index">
              <td>{{ index + 1 }}</td>
              <td v-for="column in statsStore.columns" :key="column.name">{{ player[column.name] }}</td>
            </tr>
          </tbody>          
        </table>
      </div>
    </div>
  </div>
  
  <!-- <RouterLink to="/" class="btn btn-accent">Nouveau match</RouterLink> -->
</template>

<style>
</style>
