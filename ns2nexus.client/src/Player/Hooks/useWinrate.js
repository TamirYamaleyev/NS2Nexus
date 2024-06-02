const useWinRate = (playerStats, playerRounds, teamNumber) => {
    if (!Array.isArray(playerRounds)) return 0; // Return 0 if playerRounds is not an array

    // Filter rounds where the player participated and won
    const teamWins = playerRounds.filter(round => {
        const playerStatsInRound = playerStats.find(stat => stat.roundId === round.id && stat.teamNumber === teamNumber);
        return playerStatsInRound && round.winningSide === teamNumber;
    }).length;

    // Filter rounds where the player participated
    const teamGames = playerRounds.filter(round => {
        const playerStatsInRound = playerStats.find(stat => stat.roundId === round.id && stat.teamNumber === teamNumber);
        return playerStatsInRound;
    }).length;

    // Calculate win rate as a percentage
    const winRate = teamGames > 0 ? (teamWins / teamGames) * 100 : 0;

    // Filter rounds where the player was a commander and participated
    const commandingGames = playerRounds.filter(round => {
        const playerStatsInRound = playerStats.find(stat => stat.roundId === round.id && stat.teamNumber === teamNumber);
        const roundPlayerStat = playerStats.find(stat => stat.roundId === round.id && stat.teamNumber === teamNumber);
        return playerStatsInRound && roundPlayerStat && roundPlayerStat.commanderTime >= (round.roundLength / 2);
    }).length;

    // Filter rounds where the player was a commander and won
    const commandingWins = playerRounds.filter(round => {
        const playerStatsInRound = playerStats.find(stat => stat.roundId === round.id && stat.teamNumber === teamNumber);
        const roundPlayerStat = playerStats.find(stat => stat.roundId === round.id && stat.teamNumber === teamNumber);
        return playerStatsInRound && roundPlayerStat && roundPlayerStat.commanderTime >= (round.roundLength / 2) && round.winningSide === teamNumber;
    }).length;

    // Calculate commanding win rate as a percentage
    const commandingWinRate = commandingGames > 0 ? (commandingWins / commandingGames) * 100 : 0;

    return {
        winRate: winRate,
        commandingWinRate: commandingWinRate
    };
};

export default useWinRate;
