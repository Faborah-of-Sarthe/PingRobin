import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useStatsStore = defineStore('stats', () => {

    let stats = useStorage('stats', ref([]))


    async function generate(matches) {
        
        // Flatten the matches array to make it easier to calculate the stats
        matches = matches.reduce((acc, round) => acc.concat(round), [])

        const players = []
        matches.forEach(match => {
            if (!players.includes(match.player1)) {
                players.push(match.player1)
            }
            if (!players.includes(match.player2)) {
                players.push(match.player2)
            }
        })

        // Remove the dummy player
        const byeIndex = players.indexOf('#bye')
        if (byeIndex !== -1) {
            players.splice(byeIndex, 1)
        }

        const tempStats = players.map(player => {
            const playerMatches = matches.filter((match) => (match.player1 === player || match.player2 === player) && !match.fake)
            // Putting the player in the first position to make it easier to calculate the stats
            playerMatches.forEach((match, index) => {
                if (match.player2 === player) {
                    const temp = match.player1
                    playerMatches[index].player1 = match.player2
                    playerMatches[index].player2 = temp
                    const tempScore = match.score1
                    playerMatches[index].score1 = match.score2
                    playerMatches[index].score2 = tempScore
                }
            })
            
            console.log(playerMatches)
            const winnedMatches =  playerMatches.filter(match => (match.player1 === player && match.score1 > match.score2))
            const wins = winnedMatches.length
            const losses = playerMatches.filter(match => (match.player1 === player && match.score1 < match.score2)).length
            const draws = playerMatches.filter(match => match.score1 === match.score2).length
            const pointsScored = playerMatches.reduce((acc, match) =>  acc + parseInt(match.score1), 0)
            const pointsConceded = playerMatches.reduce((acc, match) => acc + parseInt(match.score2), 0)
            const totalPositiveGoalDifference = winnedMatches.reduce((acc, match) => acc + match.score1 - match.score2, 0)
            const goalDifference = pointsScored - pointsConceded
            const points = wins * 3 + draws
            return { player, wins, losses, draws, pointsScored, pointsConceded, goalDifference, points, totalPositiveGoalDifference }

        })
console.log(tempStats);
        stats.value = tempStats
        
    }

    return {
        stats,
        generate
    }

})
