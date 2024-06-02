import { useState, useEffect } from 'react';

const useAverage = (playerStats, propertyName, teamNumber, timeUnit) => {
    const [average, setAverage] = useState(0);

    useEffect(() => {
        const totalProperty = Array.isArray(playerStats) ? playerStats
            .filter(round => round.teamNumber === teamNumber) // Filter rounds for the specified team
            .reduce((acc, round) => acc + round[propertyName], 0) : 0;

        let totalTimePlayed = Array.isArray(playerStats) ? playerStats
            .filter(round => round.teamNumber === teamNumber) // Filter rounds for the specified team
            .reduce((acc, round) => acc + round.timePlayed, 0) : 0;

        switch (timeUnit) {
            case 'hours':
                totalTimePlayed /= 3600;
                break;
            case 'minutes':
                totalTimePlayed /= 60;
                break;
            default:
                break;
        }

        if (totalTimePlayed !== 0) {
            const avg = totalProperty / totalTimePlayed;
            setAverage(avg);
        } else {
            setAverage(0);
        }
    }, [playerStats, propertyName, teamNumber, timeUnit]);

    return average;
};

export default useAverage;
