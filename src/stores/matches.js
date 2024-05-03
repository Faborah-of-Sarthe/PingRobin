import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useMatchesStore = defineStore('matches', () => {

    let list = useStorage('matches', ref([]))
    let currentRound = useStorage('currentRound', ref(1))

    const progress = computed(() => {
        return currentRound.value / list.value.length * 100
    })

    const disabledNext = computed(() => {
        if(!list.value.length) {
            return true;
        }
       return list.value[currentRound.value - 1].some((match) => { 
        return (
            match.score1 === null ||
            match.score2  === null ||
            match.score1 === '' ||
            match.score2 === '' ||
            match.score1 < 0 ||
            match.score2 < 0 ||
            isNaN(match.score1) ||
            isNaN(match.score2)
        ) && !match.fake})
    })

    const isLastRound = computed(() => {
        return currentRound.value === list.value.length
    })


    const generateMatches = async (players) => {
        const playersCopy = [...players]

        // Randomize the players
        playersCopy.sort(() => Math.random() - 0.5)

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

            // If there is a bye player, move the match to the last position and add the bye player to the second position
            if (players.length % 2 !== 0) {
                const byeMatch = round.find(match => match.player2 === '#bye' || match.player1 === '#bye')
                if (byeMatch) {
                    byeMatch.player1 = byeMatch.player1 === '#bye' ? byeMatch.player2 : byeMatch.player1
                    byeMatch.player2 = '#bye'
                    byeMatch.fake = true
                    
                    round.splice(round.indexOf(byeMatch), 1)
                    round.push(byeMatch)
                }
            }

            matches.push(round)
            // Add the last player to the second position to rotate the players and keep the first player in the same position
            playersCopy.splice(1, 0, playersCopy.pop())
        }
       
        list.value = matches
    }

    return { list, currentRound,  generateMatches, progress, disabledNext, isLastRound }
})


