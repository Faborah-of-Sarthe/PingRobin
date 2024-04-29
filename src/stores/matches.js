import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMatchesStore = defineStore('matches', () => {

    let list = ref([])

    if (localStorage.getItem("pinia-state")) {
        const localState = JSON.parse(localStorage.getItem("pinia-state"));
        list = ref(localState.matches.list)
    } 

    const generateMatches = (players) => {
        const playersCopy = [...players]
        // Dummy player to make even number of players
        if(playersCopy.length % 2 !== 0 ) {
            playersCopy.push('#bye')
            
        }
        const playersNumber = playersCopy.length
        const matches = []
        const rounds = playersNumber % 2 === 0 ? playersNumber - 1 : playersNumber
        const half = playersNumber / 2

        for (let i = 0; i < rounds; i++) {
            const round = []
            for (let j = 0; j < half; j++) {
                const player1 = playersCopy[j]
                const player2 = playersCopy[playersNumber - j - 1]
                if (player1 && player2) {
                    round.push({ player1, player2, score1: null, score2: null })
                }
            }
            matches.push(round)
            // Add the last player to the second position to rotate the players and keep the first player in the same position
            playersCopy.splice(1, 0, playersCopy.pop())
        }

        list.value = matches
    }

    return { list, generateMatches }
})


