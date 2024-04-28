import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayersStore = defineStore('players', () => {

    let list = ref([])

    if (localStorage.getItem("pinia-state")) {
        const localState = JSON.parse(localStorage.getItem("pinia-state"));
        list = ref(localState.players.list)
    } 

    const addPlayer = (player) => {
        list.value.push(player)
    }

    return { list, addPlayer }
})


