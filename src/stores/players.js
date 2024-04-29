import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const usePlayersStore = defineStore('players', () => {

    let list = useStorage('players', ref([]))

    const addPlayer = (player) => {
        if (!list.value.includes(player)) {
            list.value.push(player)
        }
            
    }

    const removePlayer = (player) => {
        list.value = list.value.filter(p => p !== player)
    }

    return { list, addPlayer, removePlayer }
})


