<template>
    <div class="flex items-center">
        <span class="badge badge-primary badge-md py-1 text-white font-bold">{{ matches.currentRound }}</span>
        <progress class="progress progress-primary w-full mx-2 min-w-40" :value="matches.progress" max="100"></progress>
        <span class="badge badge-primary badge-md py-1 text-white font-bold">{{ matches.list.length }}</span>
    </div>
</template>

<script setup>

import { useMatchesStore } from '@/stores/matches'

const matches = useMatchesStore()


</script>