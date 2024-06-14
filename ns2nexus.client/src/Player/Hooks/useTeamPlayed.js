// useTeamPlayed.js
import { useMemo } from 'react';

const useTeamPlayed = (roundPlayerStats, roundId, teamNumber) => {
    const teamPlaytime = useMemo(() => {
        const statsForRound = roundPlayerStats.filter(stats => stats.roundId === roundId && stats.teamNumber === teamNumber);
        return statsForRound.reduce((totalPlaytime, stats) => totalPlaytime + stats.timePlayed, 0);
    }, [roundPlayerStats, roundId, teamNumber]);

    return teamPlaytime;
};

export default useTeamPlayed;
