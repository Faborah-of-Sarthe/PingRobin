import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { usePlayersStore } from './players'

export const useStatsStore = defineStore('stats', () => {

    let stats = useStorage('stats', ref([]))
    let activeColumn = useStorage('activeColumn', ref('wins'))
    const columns =ref([
        {
            name: 'player',
            label: ' ',
            sortable: false
        },
        {
            name: 'wins',
            label: 'Victoires',
            sortable: true
        },
        {
            name: 'losses',
            label: 'Défaites',
            sortable: true
        },
        {
            name: 'draws',
            label: 'Nuls',
            sortable: true
        },
        {
            name: 'pointsScored',
            label: 'Points marqués',
            sortable: true
        },
        {
            name: 'pointsConceded',
            label: 'Points encaissés',
            sortable: true
        },
        {
            name: 'goalDifference',
            label: 'Différence de points',
            sortable: true
        },
        {
            name: 'points',
            label: 'Points',
            sortable: true
        },
        {
            name: 'totalPositiveGoalDifference',
            label: 'Cumul positif',
            sortable: true
        }
    ]);

    const players = usePlayersStore();

    async function generate(matches) {
        
        // Flatten the matches array to make it easier to calculate the stats
        matches = matches.reduce((acc, round) => acc.concat(round), [])

        const tempStats = players.list.map(player => {
            const unorderedPlayerMatches = matches.filter((match) => (match.player1 === player || match.player2 === player) && !match.fake)
            const playerMatches = [];
            // Putting the player in the first position to make it easier to calculate the stats
            unorderedPlayerMatches.forEach((match, index) => {
                if (match.player2 === player) {
                    const temp = {}
                    temp.player1 = match.player2
                    temp.player2 = match.player1
                    temp.score1 = match.score2
                    temp.score2 = match.score1
                    playerMatches.push(temp)
                } else {
                    playerMatches.push(match)
                }
            })
            
            const winnedMatches =  playerMatches.filter(match => (match.score1 > match.score2))
            const wins = winnedMatches.length
            const losses = playerMatches.filter(match => (match.score1 < match.score2)).length
            const draws = playerMatches.filter(match => match.score1 === match.score2).length
            const pointsScored = playerMatches.reduce((acc, match) =>  acc + parseInt(match.score1), 0)
            const pointsConceded = playerMatches.reduce((acc, match) => acc + parseInt(match.score2), 0)
            const totalPositiveGoalDifference = winnedMatches.reduce((acc, match) => acc + match.score1 - match.score2, 0)
            const goalDifference = pointsScored - pointsConceded
            const points = wins * 3 + draws
            return { player, wins, losses, draws, pointsScored, pointsConceded, goalDifference, points, totalPositiveGoalDifference }

        })
        stats.value = tempStats
        this.sortBy(activeColumn.value)
    }

    async function sortBy(key) {
        stats.value = stats.value.sort((a, b) => b[key] - a[key])
    }

    watch(activeColumn, (value) => {
        sortBy(value)
    })

    return {
        stats,
        generate,
        sortBy,
        columns,
        activeColumn
    }

})
